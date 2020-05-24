from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
from django.views.generic import FormView
from rest_framework import viewsets

from blog_app.models import BlogPost
from blog_app.serializers import BlogSerializer


class SignUpView(FormView):
    form_class = UserCreationForm
    template_name = "signup.html"

    def form_valid(self, form):
        """If the form is valid, redirect to the supplied URL."""
        form.save()
        return HttpResponseRedirect('/')


class GeeksViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(published=True)
    serializer_class = BlogSerializer