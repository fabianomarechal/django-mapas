from django.contrib.gis import admin

from .models import Mapa
# Register your models here.

admin.site.register(Mapa, admin.GeoModelAdmin)