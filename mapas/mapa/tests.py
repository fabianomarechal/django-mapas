from django.test import TestCase
import json

from django.urls import resolve
from django.http import HttpRequest

from .models import Mapa
from .views import mapa_list

# Create your tests here.
class MapaTest(TestCase):

    # def setUp(self):
    #     Mapa.objects.create()
    
    # def test_mapas_can_save(self):

    def test_api_mapas_url_resolves_to_mapas_list(self):
        found = resolve('/api/mapas/')
        self.assertEqual(found.func, mapa_list)
    
    def test_api_mapas_return_correct_json_object(self):
        response = self.client.get('/api/mapas/')
        self.assertEqual(response.status_code, 200)
        