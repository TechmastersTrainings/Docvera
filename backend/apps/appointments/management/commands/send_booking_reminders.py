import datetime
from django.core.management.base import BaseCommand
from apps.appointments.models import Appointment
from apps.appointments.emails import send_appointment_reminder_email

class Command(BaseCommand):
    help = "Sends appointment reminder emails to patients for confirmed bookings scheduled for tomorrow"

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Initializing upcoming booking reminder scan..."))
        
        tomorrow = datetime.date.today() + datetime.timedelta(days=1)
        
        # Query confirmed bookings for tomorrow that haven't received a reminder
        appointments = Appointment.objects.filter(
            status='CONFIRMED',
            booking_date=tomorrow,
            reminder_sent=False
        )
        
        count = appointments.count()
        self.stdout.write(self.style.SUCCESS(f"Found {count} confirmed appointments for tomorrow ({tomorrow})."))
        
        sent_count = 0
        for appt in appointments:
            try:
                send_appointment_reminder_email(appt)
                appt.reminder_sent = True
                appt.save()
                sent_count += 1
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Failed to send reminder for Appt {appt.id}: {str(e)}"))
                
        self.stdout.write(self.style.SUCCESS(f"Finished sending reminders. Successfully processed: {sent_count}/{count}"))
