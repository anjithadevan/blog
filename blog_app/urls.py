from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers

from . import views
from .views import GeeksViewSet

router = routers.DefaultRouter()
router.register(r'blogs', GeeksViewSet)
urlpatterns = [
    path('list/', TemplateView.as_view(template_name='blog_list.html')),
    path('', include(router.urls)),
]
