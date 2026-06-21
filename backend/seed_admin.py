import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = "admin@docvera.com"
password = "AdminPassword123!"

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password)
    print(f"Admin user {email} created successfully.")
else:
    print(f"Admin user {email} already exists. Skipping.")
