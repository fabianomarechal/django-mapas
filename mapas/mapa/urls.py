from django.urls import path

from django.conf.urls import url

from . import  views

urlpatterns = [
    path('', views.index),
    url(r'^api/mapas/$', views.mapa_list),
    url(r'^api/mapas/(?P<pk>[0-9]+)$', views.mapas_detail),
]