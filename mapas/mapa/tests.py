from django.test import TestCase

from .models import Mapa

# Create your tests here.
class MapaTest(TestCase):

    def setUp(self):
        Mapa.objects.create()
    
    # def test_mapas_can_save(self):
        