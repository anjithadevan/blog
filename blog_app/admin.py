from django.contrib import admin

# Register your models here.
from blog_app.models import BlogPost

admin.site.register(BlogPost)