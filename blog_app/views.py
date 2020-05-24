from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic import FormView
from rest_framework import viewsets
from rest_framework.response import Response

from blog_app.models import BlogPost
from blog_app.serializers import BlogSerializer


class SignUpView(FormView):
    form_class = UserCreationForm
    template_name = "signup.html"

    def form_valid(self, form):
        """If the form is valid, redirect to the supplied URL."""
        form.save()
        return HttpResponseRedirect(reverse('login'))


class GeeksViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.Published.active()
    serializer_class = BlogSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()).filter(author=self.request.user)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
