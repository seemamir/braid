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
  category = models.CharField(max_length=250)
  source = models.CharField(max_length=250)
  author_description = models.TextField(blank=True)
  main_sentence = models.TextField()
  sentence2 = models.TextField(blank=True)
  sentence3 = models.TextField(blank=True)
  sentence4 = models.TextField(blank=True)
  people1 = models.TextField()
  people2 = models.TextField(blank=True)
  people3 = models.TextField(blank=True)
  people4 = models.TextField(blank=True)
  embedded_image = models.TextField(blank=True)
  thumbnail_image = models.TextField(blank=True)

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
