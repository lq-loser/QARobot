import datetime
import json
from django.test import TestCase
from backend.models import User, Developer, API, APIorder
from backend.Service.AuthService import check_auth, not_auth
import time
from backend.Service.StatService import word_frec_stat
from backend.models import Record


class test_Stat(TestCase):
    def setUp(self) -> None:
        User.objects.create(username='A', password='123', usertype=1, email='1234567854@qq.com')
        Developer.objects.create(user_id=1)
        API.objects.create(name='api0', description='good', address='')
        API.objects.create(name='api1', description='good2', address='')
        APIorder.objects.create(dev_id=1, api_id=1, start_date='2021-8-13 14:55:00', end_date='2021-10-13 14:55:00')
        APIorder.objects.create(dev_id=1, api_id=2, start_date='2021-8-12 14:55:00', end_date='2021-08-13 14:55:00')
        Record.objects.create(apiorder_id=1, datetime=datetime.datetime.now(), content="上海交通大学的校长是谁")
        Record.objects.create(apiorder_id=1, datetime=datetime.datetime.now(), content="上海交通大学的地址在哪")
        Record.objects.create(apiorder_id=2, datetime=datetime.datetime.now(), content="上海交通大学的校长是谁")

    def test_stat_1(self):
        self.assertEqual(word_frec_stat(1, "true", "2021-07-13", "2021-08-24"), json.dumps([
            {"name": "上海交通大学", "count": 2}, {"name": "校长", "count": 1}, {"name": "地址", "count": 1}],ensure_ascii=False))
