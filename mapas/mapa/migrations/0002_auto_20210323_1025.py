# Generated by Django 3.1.7 on 2021-03-23 10:25

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mapa', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mapa',
            name='geom',
            field=django.contrib.gis.db.models.fields.GeometryCollectionField(srid=4326),
        ),
    ]
