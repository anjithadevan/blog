from rest_framework import serializers
from django.utils import timezone
from blog_app.models import BlogPost


class BlogSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=200, required=True)
    description = serializers.CharField(required=True)
    published_date = serializers.DateTimeField(read_only=True)
    created_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = BlogPost
        exclude = ['id', 'published', 'author']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        blog = BlogPost.Published.create(**validated_data)
        return blog