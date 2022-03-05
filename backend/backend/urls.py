"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from backend import views
from backend.views import ChatBotApiView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.loginView),
    path('register/', views.registerView),
    path('getuser/', views.getuserView),
    path('active/<active_code>/', views.activeUserView),
    path('addOrder/', views.addOrderView),
    # path('getOrder/', views.getOrderView),
    path('getApiOrderList/', views.getAllOrdersView),
    # path('test/', ChatBotApiView.as_view()),
    path('sendMsg/', views.checkAuthView),
    path('sendMsgByApp/', views.notAuthView),
    path('dice/', views.checkAuthViewD),
    path('diceByApp/', views.notAuthViewD),
    path('nameedit/', views.nameeditView),
    path('avataredit/', views.avatareditView),
    path('statword/',views.statword),
    path('adminpage/',views.adminpage)
   # path('simpletest', views.simpletest)
    # path('avatarget/', views.avatargetView),
    # path('nicknameget/', views.nicknamegetView),
    # path('emailget/', views.emailgetView),
    # path('sendMsg/', views.api),
]
