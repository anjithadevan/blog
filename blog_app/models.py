from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

# Create your models here.


class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    blog_image = models.FileField(upload_to='documents/')
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateTimeField(blank=True, null=True)
    published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.published:
            self.published_date = timezone.now()
        else:
            self.published_date = None
        super(BlogPost, self).save(*args, **kwargs)