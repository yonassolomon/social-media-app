from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # Posts
    path('posts/', views.post_list, name='post_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    
    # Likes
    path('posts/<int:pk>/like/', views.like_post, name='like_post'),
    
    # Comments
    path('posts/<int:post_pk>/comments/', views.comment_list, name='comment_list'),
    
    # Follow
    path('follow/<str:username>/', views.follow_user, name='follow_user'),
    
    # Feed
    path('feed/', views.feed, name='feed'),
    
    # Users
    path('users/', views.UserCreateView.as_view(), name='user_create'),
    
    # JWT Token endpoints - ADD THESE!
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]