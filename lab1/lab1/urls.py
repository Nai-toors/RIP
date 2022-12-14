"""lab1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# Controller, управление, отвечает за путь перехода по веб-приложению

from django.contrib import admin
from django.urls import path
from lab1_app import views

'''urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', views.hello),
]'''

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.MainPath),
    path('info/<int:id>/', views.GetOrder, name='info_urls'),
    path('send_delete/<int:id>', views.send_delete, name='send_delete'),
]