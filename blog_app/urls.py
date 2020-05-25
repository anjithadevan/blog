from django.contrib.auth.decorators import login_required
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers

from . import views
from .views import GeeksViewSet

router = routers.DefaultRouter()
router.register(r'blogs', GeeksViewSet)
urlpatterns = [
    path('list/', login_required(TemplateView.as_view(template_name='blog_list.html')), name='blog-listing'),
    path('', include(router.urls)),
]
