from django.test import TestCase
from backend.models import User, Developer, API, APIorder
from backend.Service.AuthService import check_auth,not_auth
import time

class test_Auth(TestCase):
    def setUp(self) -> None:

        User.objects.create(username='A', password='123', usertype=1, email='1234567854@qq.com')
        Developer.objects.create(user_id=1)
        API.objects.create(name='api0', description='good', address='')
        API.objects.create(name='api1', description='good2', address='')
        APIorder.objects.create(dev_id=1, api_id=1,start_date='2021-8-13 14:55:00',end_date='2021-10-13 14:55:00')
        APIorder.objects.create(dev_id=1, api_id=2,start_date='2021-8-12 14:55:00', end_date='2021-08-13 14:55:00')

    def test_auth_1(self):  # developer not exist
        self.assertEqual(check_auth('api0', 'B', '123','msg'), "developer not exist or password not right")

    def test_auth_2(self):  # password fail
        self.assertEqual(check_auth('api0', 'A', '1234','msg'), "developer not exist or password not right")

    def test_auth_3(self):  # order not exist
        self.assertEqual(check_auth('api2', 'A', '123','msg'), "order not exist")

    def test_auth_4(self):  # order out of date
        self.assertEqual(check_auth('api1', 'A', '123','msg'), "order out of date")

    def test_auth_6(self):  # correct
        time.sleep(3)
        self.assertEqual(check_auth('api0', 'A', '123','msg'), "authed")

    def test_not_auth(self):
        self.assertEqual(not_auth('msg'),"authed")
