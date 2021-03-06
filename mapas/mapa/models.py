from django.contrib.gis.db import models

# Create your models here.
class Mapa(models.Model):
    name = models.CharField(max_length=50)
    lat = models.FloatField()
    lon = models.FloatField()

    geom = models.GeometryCollectionField(srid=4326)

    def __str__(self):
        return self.name
    
    def getTuple(self):
        return self.geom.tuple