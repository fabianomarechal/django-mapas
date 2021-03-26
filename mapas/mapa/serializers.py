from rest_framework_gis import serializers
from .models import Mapa

class MapaSerializer(serializers.GeoFeatureModelSerializer):

    class Meta:
        geo_field = 'geom'
        auto_bbox = True
        model = Mapa
        fields = ('pk', 'name', 'lat', 'lon', 'geom')
