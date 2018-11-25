from django.db import models
from django.contrib.auth.models import User

REACTION_CHOICES = (
  ('L', 'Laugh'),
  ('S', 'Sad'),
  ('A', 'Angry'),
  ('H', 'Happy'),
)

# Create your models here.
class Post(models.Model):
  title = models.CharField(max_length=250)
  author = models.CharField(max_length=250)
  author_description = models.TextField()
  sentences = models.TextField()
  people = models.TextField()
  embedded_image = models.TextField()
  thumbnail_image = models.TextField()

  def __str__(self):
    return self.title

class PostReaction(models.Model):
  post = models.ForeignKey('api.Post',on_delete=models.CASCADE)
  reaction_type = models.CharField(max_length=20, choices=REACTION_CHOICES)
  user = models.ForeignKey(User,on_delete=models.CASCADE)

  def __str__(self):
    return "Post reaction"

class SavedPost(models.Model):
  post = models.ForeignKey('api.Post',on_delete=models.CASCADE)
  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return "Saved post"