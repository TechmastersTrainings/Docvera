from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from apps.admin.models import AuditLog, Payout, SystemSettings
from apps.admin.permissions import IsAdminUser
from apps.doctors.models import Doctor
from django.utils import timezone
from django.db.models import Sum
from apps.appointments.models import Appointment
from apps.payments.models import Payment
from apps.patients.models import Patient
from apps.reviews.models import Review

class AdminPagination(PageNumberPagination):
    page_size = 20


class DoctorManagementView(APIView, AdminPagination):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = Doctor.objects.all().order_by('-created_at')

        # Filtering logic
        specialization = request.query_params.get('specialization')
        if specialization:
            queryset = queryset.filter(specialization=specialization)

        status_param = request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)

        approval_status = request.query_params.get('approval_status')
        if approval_status:
            queryset = queryset.filter(approval_status=approval_status)

        results = self.paginate_queryset(queryset, request)

        # Import here to avoid circular imports
        from apps.doctors.serializers import DoctorSerializer
        serializer = DoctorSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)


class DoctorActionView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, doctor_id):
        doctor = get_object_or_404(Doctor, user_id=doctor_id)
        action = request.data.get('action')  # APPROVE, REJECT, SUSPEND, ACTIVATE
        reason = request.data.get('reason', '')

        # Handle Advanced Doctor Management
        if action == 'APPROVE':
            doctor.approval_status = 'APPROVED'
            doctor.is_verified = True
        elif action == 'REJECT':
            doctor.approval_status = 'REJECTED'
            doctor.rejection_reason = reason
        elif action == 'SUSPEND':
            doctor.status = 'SUSPENDED'
            doctor.user.is_suspended = True
            doctor.user.save()
        elif action == 'ACTIVATE':
            doctor.status = 'ACTIVE'
            doctor.user.is_suspended = False
            doctor.user.save()
        else:
            return Response({"success": False, "error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        doctor.save()

        # Trigger email notifications for approval/rejection
        try:
            if action == 'APPROVE':
                from apps.appointments.emails import send_doctor_approval_email
                send_doctor_approval_email(doctor)
            elif action == 'REJECT':
                from apps.appointments.emails import send_doctor_rejection_email
                send_doctor_rejection_email(doctor, reason)
        except Exception as e:
            print(f"Doctor email notification failed to trigger: {str(e)}")

        # Trigger Audit Log
        AuditLog.objects.create(
            admin_user=request.user,
            action=f"DOCTOR_{action}",
            target_object_id=doctor.user.id,
            details={"doctor_name": doctor.full_name, "reason": reason}
        )

        return Response({"success": True, "message": f"Doctor {action.lower()} processed successfully."})


class PayoutManagementView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        payouts = Payout.objects.all().order_by('-created_at')
        data = [{
            "id": str(p.id),
            "doctor_id": str(p.doctor.id),
            "amount": str(p.amount),
            "status": p.status,
            "created_at": p.created_at
        } for p in payouts]
        return Response({"success": True, "data": data})

    def post(self, request, payout_id):
        payout = get_object_or_404(Payout, id=payout_id)
        payout.status = 'PAID'
        payout.save()

        # Trigger Audit Log
        AuditLog.objects.create(
            admin_user=request.user,
            action="PAYOUT_PROCESSED",
            target_object_id=payout.id,
            details={"amount": str(payout.amount), "doctor_id": str(payout.doctor.id)}
        )

        return Response({"success": True, "message": "Payout marked as paid."})


class SystemSettingsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        settings = SystemSettings.objects.all().values('key', 'value', 'description')
        return Response({"success": True, "data": settings})

    def post(self, request):
        key = request.data.get('key')
        value = request.data.get('value')
        description = request.data.get('description', '')

        if not key or not value:
            return Response({"success": False, "error": "Key and value are required"},
                            status=status.HTTP_400_BAD_REQUEST)

        setting, created = SystemSettings.objects.update_or_create(
            key=key,
            defaults={'value': value, 'description': description}
        )

        # Trigger Audit Log
        AuditLog.objects.create(
            admin_user=request.user,
            action="SETTING_UPDATED",
            target_object_id=request.user.id,
            details={"key": key, "new_value": value}
        )

        return Response({"success": True, "message": "System settings updated."})


class FinancialStatsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        today = timezone.now().date()

        # 1. Patients for the day: distinct patients who booked an appointment today
        patients_today = Appointment.objects.filter(created_at__date=today).values('patient').distinct().count()

        # 2. Bookings for the day (INR): sum of CAPTURED payment amounts today
        bookings_today = Payment.objects.filter(
            status='CAPTURED', 
            created_at__date=today
        ).aggregate(total=Sum('amount'))['total'] or 0.00

        # 3. Doctors available
        doctors_available = Doctor.objects.filter(status='ACTIVE', approval_status='APPROVED').count()

        # 4. Cancellations today
        cancellations_today = Appointment.objects.filter(status='CANCELLED', updated_at__date=today).count()

        # 5. Refunds today
        refunds_today = Payment.objects.filter(
            status='REFUNDED', 
            updated_at__date=today
        ).aggregate(total=Sum('amount'))['total'] or 0.00

        # 6. Pending Payouts (INR)
        pending_payouts = Payout.objects.filter(
            status='PENDING'
        ).aggregate(total=Sum('amount'))['total'] or 0.00

        return Response({
            "success": True,
            "data": {
                "patients_today": patients_today,
                "bookings_today_inr": float(bookings_today),
                "doctors_available": doctors_available,
                "cancellations_today": cancellations_today,
                "refunds_today_inr": float(refunds_today),
                "pending_payouts_inr": float(pending_payouts)
            }
        })


class PatientManagementView(APIView, AdminPagination):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = Patient.objects.select_related('user').all().order_by('-created_at')
        results = self.paginate_queryset(queryset, request)
        
        data = [{
            "id": str(p.user.id),
            "email": p.user.email,
            "phone": p.user.phone,
            "full_name": p.full_name,
            "gender": p.gender,
            "city": p.city,
            "is_suspended": p.user.is_suspended,
            "created_at": p.created_at
        } for p in results]
        
        return self.get_paginated_response(data)


class PatientActionView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, patient_id):
        patient = get_object_or_404(Patient, user_id=patient_id)
        action = request.data.get('action')

        if action == 'SUSPEND':
            patient.user.is_suspended = True
            patient.user.save()
        elif action == 'ACTIVATE':
            patient.user.is_suspended = False
            patient.user.save()
        else:
            return Response({"success": False, "error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

        # Trigger Audit Log
        AuditLog.objects.create(
            admin_user=request.user,
            action=f"PATIENT_{action}",
            target_object_id=patient.user.id,
            details={"patient_name": patient.full_name, "patient_email": patient.user.email}
        )

        return Response({"success": True, "message": f"Patient {action.lower()}d successfully."})


class AuditLogView(APIView, AdminPagination):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = AuditLog.objects.select_related('admin_user').all().order_by('-timestamp')
        results = self.paginate_queryset(queryset, request)
        
        data = [{
            "id": str(log.id),
            "admin_email": log.admin_user.email if log.admin_user else "System",
            "action": log.action,
            "target_object_id": str(log.target_object_id),
            "details": log.details,
            "timestamp": log.timestamp
        } for log in results]
        
        return self.get_paginated_response(data)


class AdminReviewManagementView(APIView, AdminPagination):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = Review.objects.select_related('patient', 'doctor').all().order_by('-created_at')
        results = self.paginate_queryset(queryset, request)
        
        data = [{
            "id": str(r.id),
            "patient_name": r.patient.full_name,
            "doctor_name": r.doctor.full_name,
            "rating": r.rating,
            "comment": r.comment,
            "created_at": r.created_at
        } for r in results]
        
        return self.get_paginated_response(data)