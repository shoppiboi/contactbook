from django.shortcuts import render
from rest_framework import viewsets #   provides implementation for CRUD by default
from .serializers import ContactSerializer
from .models import Contact

# Create your views here.

class ContactBookView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()