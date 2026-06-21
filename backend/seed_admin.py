import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = "Techmasterstrainings@gmail.com"
password = "Fri1025Feb@2023"

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
    print(f"Admin user {email} created successfully.")
else:
    print(f"Admin user {email} already exists. Skipping.")
