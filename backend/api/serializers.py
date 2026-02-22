from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post,Like,Comment,Follow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','first_name','last_name']

class PostSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    likes_count=serializers.SerializerMethodField()
    comments_count=serializers.SerializerMethodField()
    class Meta:
        model=Post
        fields=['id','user','content','image','created_at','updated_at','likes_count','comments_count']    
    def get_likes_count(self,obj):
        return obj.likes.count()
    def get_comments_count(self,obj):
        return obj.comments.count()    
    
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Like
        fields=['id','user','post','created_at']  

class CommentSerializer(serializers.ModelSerializer):
    user=UserSerializer(read_only=True)
    class Meta:
        model=Comment
        fields=['id','user','post','content','created_at','updated_at']

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model=Follow
        fields=['id','follower','following','created_at']                  