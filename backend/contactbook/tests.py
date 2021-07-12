import json
from django.test import TestCase, Client
from rest_framework import status
from .models import Contact
from .serializers import ContactSerializer

client = Client()

class GetAllContactsTest(TestCase):

    def setUp(self):
        Contact.objects.create(name='John Smith', phone='1234567890', email='john.smith@gmail.com')
        Contact.objects.create(name='Sally Smith', phone='8901234567', email='sally.smith@gmail.com')
        Contact.objects.create(name='Bob Builder', phone='5678901234', email='builder.bob@gmail.com')

    def test_get_all_contacts(self):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        response = client.get('/api/contactbook/')

        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GetSingleContactTest(TestCase):
    def setUp(self):
        self.john = Contact.objects.create(name='John Smith', phone='1234567890', email='john.smith@gmail.com')
        self.sally = Contact.objects.create(name='Sally Smith', phone='8901234567', email='sally.smith@gmail.com')
        self.bob = Contact.objects.create(name='Bob Builder', phone='5678901234', email='builder.bob@gmail.com')

    def test_get_valid_contact(self):
        test_contact = Contact.objects.get(pk=self.sally.pk)
        serializer = ContactSerializer(test_contact)
        response = client.get('/api/contactbook/' + str(self.sally.pk) + '/')
        
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_invalid_contact(self):
        response = client.get('/api/contactbook/45/')

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class PostSingleContactTest(TestCase):
    def setUp(self):
        self.valid_payload = {
            'name': 'Jack Morrison',
            'phone': '1234567890',
            'email': 'jack.morrison@gmail.com'
        }

        self.invalid_payload = {
            'name': 'Jack Jackson',
            'phone': '6789012345',
            'email': '@'
        }

    def test_create_valid_contact(self):
        response = client.post(
            '/api/contactbook/',
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_contact(self):
        response = client.post(
            '/api/contactbook/',
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )

        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)

class UpdateSingleContactTest(TestCase):
    def setUp(self):
        self.john = Contact.objects.create(
            name='John Smith', phone='1234567890', email='john.smith@gmail.com')
        self.sally = Contact.objects.create(
            name='Sally Smith', phone='8901234567', email='sally.smith@gmail.com')
        self.bob = Contact.objects.create(
            name='Bob Builder', phone='5678901234', email='builder.bob@gmail.com')

        self.valid_payload = {
            'name': 'Bob Builder',
            'phone': '9012345678',
            'email': 'bob@bobthebuilder.com'
        }

        self.invalid_payload = {
            'name': '',
            'phone': '1234567890',
            'email': 'sue.sutton@gmail.com'
        }

    def test_update_valid_contact(self):
        response = client.put(
            '/api/contactbook/' + str(self.bob.pk) + '/',
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_invalid_contact(self):
        response = client.put(
            '/api/contactbook/' + str(self.bob.pk) + '/',
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class DeleteSingleContactTest(TestCase):
    def setUp(self):
        self.john = Contact.objects.create(
            name='John Smith', phone='1234567890', email='john.smith@gmail.com')
        self.sally = Contact.objects.create(
            name='Sally Smith', phone='8901234567', email='sally.smith@gmail.com')
        self.bob = Contact.objects.create(
            name='Bob Builder', phone='5678901234', email='builder.bob@gmail.com')        

    def test_delete_valid_contact(self):
        response = client.delete(
            '/api/contactbook/' + str(self.bob.pk) + '/'
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_invalid_contact(self):
        response = client.delete(
            '/api/contactbook/55/'
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)