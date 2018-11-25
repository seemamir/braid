from .models import Post,PostReaction,SavedPost, Comment
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
  class Meta:
    model = Post
    fields = "__all__"


class PostReactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = PostReaction
    fields = "__all__"


class SavedPostSerializer(serializers.ModelSerializer):
  class Meta:
    model = SavedPost
    fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Comment
    fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = "__all__"

  def create(self, validated_data):
    user = User.objects.create(
      username=validated_data['username'],
      first_name=validated_data['first_name'],
      last_name=validated_data['last_name'],
      email=validated_data['email'],
    )

    user.set_password(validated_data['password'])
    user.save()

    return user
