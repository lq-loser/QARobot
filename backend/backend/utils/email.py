from django.core.mail import send_mail
import random
from backend import settings
from backend.models import EmailVerifyRecord


def random_codechr(length=16):
    """
    随机产生验证码的函数
    :param length: 默认值为16
    :return: 一个随机生成的验证码
    """
    # 随机大小写组合的验证码
    chars = 'quFDGDbtwehykjahuhufHFCUHNCWEHAFDONCJUHU'
    codechr = ''
    for x in range(length):
        # 随机取出一个字符
        codechr += random.choice(chars)
    return codechr


def send(email):
    """
    向目标邮箱发送激活邮件
    :param email: 发送至该邮箱
    :return: 1代表发送成功，0代表发送失败
    """
    try:
        subject = 'Robot注册信息'  # 主题
        from_email = settings.EMAIL_FROM  # 发件人，在settings.py中已经配置
        to_email = email  # 邮件接收者列表
        code = random_codechr()
        email_record = EmailVerifyRecord()
        email_record.code = code
        email_record.email = email
        email_record.save()
        email_body = "你好，很荣幸你能使用我们的交讯问答机器人，请点击链接激活你的账号:http://123.60.111.188:8000/active/{0}".format(code)
        return send_mail(subject, email_body, from_email, [to_email])
    except Exception as e:
        print('邮件发送失败 Error:%s' % e)
        return 0
