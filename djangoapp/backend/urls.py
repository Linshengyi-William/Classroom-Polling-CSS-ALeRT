"""djangoapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from login import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'instructor', views.InstructorView, 'instructor')
router.register(r'course', views.CourseView, 'course')
router.register(r'student', views.StudentView, 'student')
router.register(r'question', views.QuestionView, 'question')
router.register(r'studentanswer', views.StudentAnswerView, 'studentanswer')
router.register(r'coursesession', views.CourseSessionView, 'course_session')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    path('api/', include(router.urls)),
]
