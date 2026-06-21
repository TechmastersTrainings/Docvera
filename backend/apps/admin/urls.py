from django.urls import path
from .views import (
    DoctorManagementView,
    DoctorActionView,
    PayoutManagementView,
    SystemSettingsView,
    FinancialStatsView,
    PatientManagementView,
    PatientActionView,
    AuditLogView,
    AdminReviewManagementView
)

urlpatterns = [
    # Doctor Management & Actions
    path('doctors/', DoctorManagementView.as_view(), name='admin_doctors'),
    path('doctors/<uuid:doctor_id>/action/', DoctorActionView.as_view(), name='admin_doctor_action'),

    # Patient Management
    path('patients/', PatientManagementView.as_view(), name='admin_patients'),
    path('patients/<uuid:patient_id>/action/', PatientActionView.as_view(), name='admin_patient_action'),

    # Financial Engine
    path('payouts/', PayoutManagementView.as_view(), name='admin_payout_list'),
    path('payouts/<uuid:payout_id>/', PayoutManagementView.as_view(), name='admin_payout_process'),
    path('financial-stats/', FinancialStatsView.as_view(), name='admin_financial_stats'),

    # Audit & Security
    path('audit-logs/', AuditLogView.as_view(), name='admin_audit_logs'),
    path('reviews/', AdminReviewManagementView.as_view(), name='admin_reviews'),

    # Global Config
    path('settings/', SystemSettingsView.as_view(), name='admin_settings'),
]