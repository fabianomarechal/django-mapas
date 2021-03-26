from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.gis.geos import Polygon, GEOSGeometry, GeometryCollection
from .models import Mapa

from .serializers import *

# Create your views here.
def index(req):
    return render(req, 'mapa/index.html')

def json_to_geom(a):
            for x in range(len(a)):
                a[x] = tuple(map(tuple, (y for y in a[x])))
            return a[0]

@api_view(['GET', 'POST'])
@parser_classes([JSONParser])
def mapa_list(request):
    # Recupera e cria mapa
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        mapas = Mapa.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(mapas, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)
        
        serializer = MapaSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages, 'nextlink': '/api/mapas/?page=' + str(nextPage), 'prevlink': '/api/mapas/?page=' + str(previousPage)})
    
    elif request.method == 'POST':
        p = request.data['properties']
        attrs = [ p['geometry'] for p in  request.data['features'] ]
        geometries = []
        
        for geo in attrs:
            if geo['coordinates']:
                geo['coordinates'] = json_to_geom(geo['coordinates'])
                geometries.append(Polygon(geo['coordinates'], srid=4326))
        
        m = Mapa(name=p['name'], lat=p['lat'], lon=p['lon'], geom=GeometryCollection(tuple(geometries)))
        m.save();
        serializer = MapaSerializer(m, context={'request', request});

        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def mapas_detail(request, pk):
    """
    Retrieve, update or delete a mapa by id/pk.
    """
    try:
        mapa = Mapa.objects.get(pk=pk)
    except Mapa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MapaSerializer(mapa,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':        
        p = request.data['properties']
        geometries = []
        
        if 'geometry' in request.data:
            for geo in request.data['geometry']['geometries']:
                if geo['coordinates']:
                    geo['coordinates'] = json_to_geom(geo['coordinates'])
                    geometries.append(Polygon(geo['coordinates'], srid=4326))
        else:
            attrs = [ p['geometry'] for p in request.data['features'] ]
            for geo in attrs:
                if geo['coordinates']:
                    geo['coordinates'] = json_to_geom(geo['coordinates'])
                    geometries.append(Polygon(geo['coordinates'], srid=4326))
        
        mapa.name, mapa.lat, mapa.lon, mapa.geom = (p['name'], p['lat'], p['lon'], GeometryCollection(tuple(geometries)))
        # mapa.geom = GeometryCollection(tuple(geometries));
        mapa.save();
        serializer = MapaSerializer(mapa, context={'request', request});

        return Response(serializer.data)

    elif request.method == 'DELETE':
        mapa.delete()
        return JsonResponse({'pk': mapa.pk})