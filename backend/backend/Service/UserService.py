import json
from django.http import HttpResponse
from ..models import User, Developer
from ..utils.email import send


def getUser(name):
    """
    getUser 根据用户名查询是否含有该用户名
    :param name: 用户名
    :return: msg=right不存在该用户名,msg=exist存在该用户名
    """
    msg = 'right'
    if User.objects.filter(username=name):
        msg = 'exist'
        return msg
    if len(name) < 3:
        msg = '用户名至少为3个字符'
    if len(name) > 6:
        msg = '用户名最多为6个字符'
    return msg


def login(name, pwd, checked):
    """
    login 根据用户名，密码，检查用户是否被激活然后登录
    :param name: 用户名
    :param pwd: 密码
    :param checked: 是否记住密码
    :return: data包含用户基本信息
    """
    # usertype为0为普通用户，usertype为1为开发者
    if User.objects.filter(username=name):
        user = User.objects.filter(username=name)[0]
        if user.password == pwd:
            userdata = 'right'
            usertype = user.usertype
            userid = user.userid
            username = user.username
            active = user.is_active
            imagedata = user.imagedata
            imagemime = user.imagemime
            nickname = user.nickname

            email = user.email
            if nickname == '':
                nickname = username
            # 账号激活才能够登录
            if active:
                if usertype:
                    developer = Developer.objects.filter(user_id=userid)[0]
                    dev_id = developer.devid
                    billings=developer.billings
                    if checked:
                        data = {'userdata': userdata, 'usertype': usertype, 'userid': userid, 'devid': dev_id,
                                'nickname': nickname, 'username': username, 'password': pwd, 'imagedata': imagedata,
                                'imagemime': imagemime, 'email': email, 'billings':billings}
                    else:
                        data = {'userdata': userdata, 'usertype': usertype, 'userid': userid, 'devid': dev_id,
                                'nickname': nickname, 'imagedata': imagedata, 'imagemime': imagemime, 'email': email,'billings':billings}
                    return data
                else:
                    if checked:
                        data = {'userdata': userdata, 'usertype': usertype, 'userid': userid, 'nickname': nickname,
                                'username': username, 'password': pwd, 'imagedata': imagedata, 'imagemime': imagemime,
                                'email': email
                                }
                    else:
                        data = {'userdata': userdata, 'usertype': usertype, 'userid': userid, 'nickname': nickname,
                                'imagedata': imagedata, 'imagemime': imagemime, 'email': email}
                    return data
            else:
                userdata = '用户未激活'
        else:
            userdata = '密码输入错误'
    else:
        userdata = '该用户不存在'
    data = {'userdata': userdata}
    return data


def addUser(username, pwd, usertype, email):
    """
    addUser 向数据库增加用户
    :param username: 用户名
    :param pwd: 密码
    :param usertype:用户类型(0为普通用户，1为开发者)
    :param email: 邮箱地址
    :return: data包含用户基本信息
    """
    # 用户名不能使用已注册的
    if User.objects.filter(username=username):
        msg = 'exist'
        data = {'userdata': msg}
        return data
    # 邮箱不能使用已注册的邮箱
    if User.objects.filter(email=email):
        msg = 'exist email'
        data = {'userdata': msg}
        return data
    else:
        user_obj = User(username=username, password=pwd, usertype=usertype, email=email)
        ret = send(email)
        if ret == 0:
            msg = 'wrong email'
            data = {'userdata': msg}
            return data
        user_obj.save()
        msg = 'no exist'
        if usertype:
            userid = user_obj.userid
            develop_obj = Developer(user_id=userid)
            develop_obj.save()
            dev_id = develop_obj.devid
            data = {'userdata': msg, 'usertype': usertype, 'userid': userid, 'devid': dev_id,
                    'nickname': username}
            return data
        else:
            userid = user_obj.userid
            data = {'userdata': msg, 'usertype': usertype, 'userid': userid, 'nickname': username}
            return data


def nameedit(id, newname):
    if User.objects.filter(userid=id):
        user = User.objects.filter(userid=id)[0]
        user.nickname = newname
        user.save()
        data = {'msg': 'success'}
        return data
    else:
        data = {'msg': 'fail'}
        return data

def avataredit(id, imagedata, imagemime):
    if User.objects.filter(userid=id):
        user = User.objects.filter(userid=id)[0]
        user.imagedata = imagedata
        user.imagemime = imagemime
        user.save()
        data = {'msg': 'success'}
        return data
    else:
        data = {'msg': 'fail'}
        return data

# def avatarget(name):
#     if User.objects.filter(username=name):
#         user = User.objects.filter(username=name)[0]
#         data = {'imagedata': user.imagedata, 'imagemime': user.imagemime}
#         return data
#     else:
#         data = {'imagedata': '', 'imagemime': ''}
#         return data
#
# def nicknameget(name):
#     if User.objects.filter(username=name):
#         user = User.objects.filter(username=name)[0]
#         data = {'nickname': user.nickname}
#         return data
#     else:
#         data = {'nickname': ''}
#         return data
#
# def emailget(name):
#     if User.objects.filter(username=name):
#         user = User.objects.filter(username=name)[0]
#         data = {'email': user.email}
#         return data
#     else:
#         data = {'email': ''}
#         return data
