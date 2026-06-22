import logging
import threading
from django.core.mail import send_mail
from django.conf import settings
from django.utils.html import strip_tags

logger = logging.getLogger(__name__)

def _send_email_task(subject, recipient_list, html_content):
    try:
        from_email = settings.DEFAULT_FROM_EMAIL
        plain_text = strip_tags(html_content)
        
        send_mail(
            subject=subject,
            message=plain_text,
            from_email=from_email,
            recipient_list=recipient_list,
            html_message=html_content,
            fail_silently=False,
        )
        logger.info(f"Booking confirmation email sent successfully to {recipient_list}")
        print(f"EMAIL SENT: Subject: '{subject}' to {recipient_list}")
    except Exception as e:
        logger.error(f"Failed to send booking confirmation email: {str(e)}", exc_info=True)
        print(f"EMAIL SEND FAILURE: {str(e)}")

def send_booking_confirmation_email(appointment):
    """
    Constructs and sends a booking confirmation email to the patient.
    Runs asynchronously in a background thread to avoid slowing down HTTP response.
    """
    try:
        patient_email = appointment.patient.user.email
        patient_name = appointment.patient.full_name
        doctor_name = appointment.doctor.full_name
        
        # Safe specialization display
        specialization_display = dict(appointment.doctor.SPECIALIZATION_CHOICES).get(
            appointment.doctor.specialization, appointment.doctor.specialization
        ).title()
        
        # Format Date & Time
        formatted_date = appointment.booking_date.strftime('%A, %B %d, %Y')
        formatted_start = appointment.start_time.strftime('%I:%M %p')
        formatted_end = appointment.end_time.strftime('%I:%M %p')
        
        # Payout / Location Details
        location = ""
        if appointment.hospital:
            location = f"{appointment.hospital.name}<br>{appointment.hospital.address}, {appointment.hospital.city}"
        elif appointment.doctor.clinic_name:
            location = f"{appointment.doctor.clinic_name}<br>{appointment.doctor.clinic_address}, {appointment.doctor.clinic_city}"
        else:
            location = "Online Consultation / Check Dashboard"

        subject = f"Booking Confirmed with Dr. {doctor_name} - Docvera"
        
        # Modern, premium responsive HTML Email
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=device-width, initial-scale=1.0">
            <title>Booking Confirmed</title>
            <style>
                body {{
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    background-color: #f4f6f8;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                }}
                .email-container {{
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
                    border: 1px solid #eef2f7;
                }}
                .header {{
                    background-color: #031d44;
                    padding: 30px 20px;
                    text-align: center;
                    color: #ffffff;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 24px;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }}
                .header p {{
                    margin: 5px 0 0 0;
                    font-size: 14px;
                    opacity: 0.9;
                }}
                .body {{
                    padding: 30px 30px;
                    color: #2c3e50;
                }}
                .greeting {{
                    font-size: 18px;
                    font-weight: 700;
                    margin-top: 0;
                    margin-bottom: 10px;
                    color: #031d44;
                }}
                .intro {{
                    font-size: 15px;
                    line-height: 1.5;
                    margin-bottom: 25px;
                    color: #537eac;
                }}
                .card {{
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                }}
                .card-title {{
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #028597;
                    margin-top: 0;
                    margin-bottom: 15px;
                    letter-spacing: 1px;
                }}
                .detail-row {{
                    display: table;
                    width: 100%;
                    margin-bottom: 10px;
                    font-size: 14px;
                }}
                .detail-label {{
                    display: table-cell;
                    width: 35%;
                    font-weight: 600;
                    color: #4a5568;
                }}
                .detail-value {{
                    display: table-cell;
                    width: 65%;
                    color: #1a202c;
                }}
                .pricing-table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }}
                .pricing-row {{
                    border-bottom: 1px solid #e2e8f0;
                }}
                .pricing-row td {{
                    padding: 8px 0;
                    font-size: 14px;
                }}
                .total-row td {{
                    font-weight: 700;
                    font-size: 16px;
                    color: #031d44;
                    padding-top: 12px;
                }}
                .button-container {{
                    text-align: center;
                    margin: 30px 0;
                }}
                .btn {{
                    background-color: #028597;
                    color: #ffffff !important;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: 700;
                    font-size: 14px;
                    display: inline-block;
                    box-shadow: 0 4px 6px rgba(2, 133, 151, 0.2);
                }}
                .btn:hover {{
                    background-color: #025964;
                }}
                .footer {{
                    background-color: #f8fafc;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #718096;
                    border-top: 1px solid #e2e8f0;
                }}
                .footer p {{
                    margin: 5px 0;
                }}
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Docvera</h1>
                    <p>Your Health Partner</p>
                </div>
                <div class="body">
                    <p class="greeting">Hello {patient_name},</p>
                    <p class="intro">Your appointment booking is confirmed! Here are the details of your upcoming consultation.</p>
                    
                    <div class="card">
                        <h3 class="card-title">Appointment Details</h3>
                        <div class="detail-row">
                            <div class="detail-label">Doctor:</div>
                            <div class="detail-value"><strong>Dr. {doctor_name}</strong> ({specialization_display})</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Date:</div>
                            <div class="detail-value">{formatted_date}</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Time:</div>
                            <div class="detail-value">{formatted_start} - {formatted_end}</div>
                        </div>
                        <div class="detail-row">
                            <div class="detail-label">Location:</div>
                            <div class="detail-value">{location}</div>
                        </div>
                    </div>
                    
                    <div class="card">
                        <h3 class="card-title">Receipt Breakdown</h3>
                        <table class="pricing-table">
                            <tr class="pricing-row">
                                <td style="color: #4a5568;">Consultation Fee</td>
                                <td align="right" style="font-weight: 600;">₹{appointment.base_amount}</td>
                            </tr>
                            <tr class="pricing-row">
                                <td style="color: #4a5568;">Platform Charge (incl. GST)</td>
                                <td align="right" style="font-weight: 600;">₹{appointment.platform_fee}</td>
                            </tr>
                            <tr class="total-row">
                                <td>Total Amount Paid</td>
                                <td align="right">₹{appointment.total_amount}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="button-container">
                        <a href="https://docvera.techmaster.space/dashboard/patient" class="btn" target="_blank">Go to Dashboard</a>
                    </div>
                    
                    <p style="font-size: 13px; color: #718096; line-height: 1.5; text-align: center;">
                        If you need to reschedule or cancel your appointment, please do so at least 2 hours before your scheduled time.
                    </p>
                </div>
                <div class="footer">
                    <p>&copy; 2026 Docvera. All rights reserved.</p>
                    <p>Sent via Techmasterstrainings@gmail.com</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Start a background thread to send the email
        thread = threading.Thread(
            target=_send_email_task,
            args=(subject, [patient_email], html_content)
        )
        thread.start()
        
    except Exception as e:
        logger.error(f"Error initializing booking confirmation email thread: {str(e)}", exc_info=True)
        print(f"EMAIL INITIALIZATION FAILURE: {str(e)}")
