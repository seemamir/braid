from django.contrib import admin
from .models import Post,PostReaction,SavedPost
# Register your models here.
admin.site.register(Post)
admin.site.register(PostReaction)
admin.site.register(SavedPost)