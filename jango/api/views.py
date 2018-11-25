from django.shortcuts import render
from .models import Post,PostReaction,SavedPost
from .serializers import PostSerializer,PostReactionSerializer, SavedPostSerializer, UserSerializer

from django.contrib.auth.models import User
from rest_framework import status, viewsets
from django.http import JsonResponse
from django.contrib.auth.models import User
import pprint
# Create your views here.


class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer


class PostReactionViewSet(viewsets.ModelViewSet):
  queryset = PostReaction.objects.all()
  serializer_class = PostReactionSerializer


class SavedPostViewSet(viewsets.ModelViewSet):
  queryset = SavedPost.objects.all()
  serializer_class = SavedPostSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  
def Login(request):
  method = request.method
  if (method == 'POST'):
    return JsonResponse({'success': ""})
  else:
    return JsonResponse({'error': "This request only handles post request"})


def Signup(request):
  method = request.method
  # pprint(request)
  if (method == 'POST'):
    # try:
      user = User.objects.create(
        username=request.POST['username'],
        first_name=request.POST['first_name'],
        last_name=request.POST['last_name'],
        email=request.POST['email'],
      )

      user.set_password(user['password'])
      user.save()
      return JsonResponse({'password': user['email']})
    # except:
        # return JsonResponse({'error': 'Something went wrong'})
  else:
    return JsonResponse({'error': "This request only handles post request"})


def RequestPasswordResetToken(request):
  return 3


def ResetPassword(request):
  return 4
