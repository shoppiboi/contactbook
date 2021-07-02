from django.test import TestCase
from rest_framework.test import APIRequestFactory
from contactbook import views
from .models import Contact

class ViewSetTest(TestCase):
    def test_viewset_basic(self):
        request = APIRequestFactory().get("")
        contact_detail = views.ContactBookView.as_view({'get': 'retrieve'})
        test_contact = Contact.objects.create(name='John Smith', phone='1234567890', email='john.smith@gmail.com')
        response  = contact_detail(request, pk=test_contact.pk)
        self.assertEqual(response.status_code, 200)