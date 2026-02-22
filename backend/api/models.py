from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Post(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='posts')
    content=models.TextField(max_length=500)
    image=models.ImageField(upload_to='post_images/',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        ordering=['-created_at']

    def __str__(self):
        return f"{self.user.username}'s post: {self.content[:30]}"
    
class Like(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='likes')
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name='likes')
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together=['user','post']#1 like per user per post

    def __str__(self):
        return f"{self.user.username} liked post {self.post.id}"

class Comment(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,related_name='comments')
    post=models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
    content=models.TextField(max_length=300)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    class Meta:
        ordering=['created_at']

    def __str__(self):
        return f"{self.user.username} commented:{self.content[:20]}"

class Follow(models.Model):
    follower=models.ForeignKey(User,on_delete=models.CASCADE,related_name='following')
    following=models.ForeignKey(User,on_delete=models.CASCADE,related_name='followers')
    created_at=models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together=['follower','following']#can't follow same user twise

        def __str__(self):
            return f"{self.follower.username} follows {self.following.username}"

