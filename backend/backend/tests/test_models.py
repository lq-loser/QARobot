from django.test import TestCase

from backend.models import User, Developer, API, APIorder


class TestUser(TestCase):
    def setUp(self) -> None:
        User.objects.create(username='A', password='123', usertype=1, email='1234567854@qq.com')
        User.objects.create(username='b', password='123456', usertype=0, email='4566489465@126.com')

    def test_user_model_1(self):
        user = User.objects.get(username='A')
        usertype = user.usertype
        pwd = user.password
        self.assertEqual('123', pwd)
        self.assertEqual(1, usertype)

    def test_user_model_2(self):
        user = User.objects.get(username='b')
        usertype = user.usertype
        pwd = user.password
        self.assertEqual('123456', pwd)
        self.assertEqual(0, usertype)


class TestDeveloper(TestCase):
    def setUp(self) -> None:
        User.objects.create(username='A', password='123', usertype=1, email='1245649884@123.com')
        Developer.objects.create(user_id=1)

    def test_dev_model_1(self):
        user = User.objects.get(username='A')
        developer = Developer.objects.get(user_id=user.userid)
        self.assertEqual(1, user.usertype)
        self.assertEqual(1, developer.user_id)

    def test_dev_model_2(self):
        developer = Developer.objects.get(user_id=1)
        user = User.objects.get(userid=developer.user_id)
        self.assertIsNotNone(user)
        self.assertEqual('A', user.username)


class TestAPI(TestCase):
    def setUp(self) -> None:
        API.objects.create(name='api0', description='good', address='')
        API.objects.create(name='api1', description='right', address='wfk')

    def test_api_model_1(self):
        api = API.objects.get(apiid=1)
        self.assertEqual('api0', api.name)
        self.assertEqual('good', api.description)

    def test_api_model_2(self):
        api = API.objects.get(name='api1')
        self.assertEqual(2, api.apiid)
        self.assertEqual('right', api.description)

