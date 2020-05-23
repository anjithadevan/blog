from django.urls import path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('list/', TemplateView.as_view(template_name='blog_list.html')),
]
