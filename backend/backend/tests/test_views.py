from django.test import TestCase

from backend.models import User, Developer
from backend.views import loginView


class TestLoginView(TestCase):
    def setUp(self) -> None:
        User.objects.create(username='A', usertype=1, password='123')
        User.objects.create(username='c', usertype=0, password='123')
        Developer.objects.create(user_id=1)

    def test_login(self):
        response = self.client.post('/login')
        self.assertIsNotNone(response)

    def test_register(self):
        response = self.client.post('/register')
        self.assertIsNotNone(response)

    def test_chat(self):
        response = self.client.post('/test')
        self.assertIsNotNone(response)

    def test_getUser(self):
        response = self.client.post('/getuser')
        self.assertIsNotNone(response)

    def test_addOrder(self):
        response = self.client.post('/addOrder')
        self.assertIsNotNone(response)
