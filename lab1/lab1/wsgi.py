"""
WSGI config for lab1 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/wsgi/
"""



import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lab1.settings')

application = get_wsgi_application()


import django

from lab1_app.models import Brand, Car_model

django.setup()
# f = Brand(
#             name1 = "Mercedes-Benz Actros",
#             Country = "German",
#             Description = "Лучший в своем классе!"
#             )
# f.save()
#
# f = Brand(
#             name1 ="IVECO S-WAY",
#             Country = "Italian",
#             Description = "Тяжеловес!"
#             )
# f.save()
#
# f = Brand(
#             name1 ="Volvo FH I-Save",
#             Country = "Sweeden",
#             Description = "Самый надежный!"
#             )
# f.save()
#
# f = Brand(
#             name1 ="Volvo FH16",
#             Country = "Sweeden",
#             Description = "Не самый лучший..."
#             )
# f.save()


g = Car_model(

)