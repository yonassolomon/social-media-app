from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    path('posts/<int:pk>/like/', views.like_post, name='like_post'),
    path('posts/<int:post_pk>/comments/', views.comment_list, name='comment_list'),
    path('follow/<str:username>/', views.follow_user, name='follow_user'),
    path('feed/', views.feed, name='feed'),
]