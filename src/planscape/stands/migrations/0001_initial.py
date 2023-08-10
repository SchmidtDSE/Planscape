# Generated by Django 4.1.10 on 2023-08-10 20:13

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('conditions', '0004_get_condition_pixels'),
    ]

    operations = [
        migrations.CreateModel(
            name='Stand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('size', models.CharField(choices=[('FINE', 'Fine'), ('MEDIUM', 'Medium'), ('LARGE', 'Large')], max_length=16)),
                ('geometry', django.contrib.gis.db.models.fields.PolygonField(srid=4269)),
                ('area_m2', models.FloatField()),
                ('area_ha', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='StandMetric',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('min', models.FloatField(null=True)),
                ('avg', models.FloatField(null=True)),
                ('max', models.FloatField(null=True)),
                ('sum', models.FloatField(null=True)),
                ('count', models.IntegerField(null=True)),
                ('condition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='metrics', to='conditions.condition')),
                ('stand', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='metrics', to='stands.stand')),
            ],
        ),
        migrations.AddIndex(
            model_name='stand',
            index=models.Index(fields=['size'], name='stand_size_index'),
        ),
        migrations.AddConstraint(
            model_name='standmetric',
            constraint=models.UniqueConstraint(fields=('stand', 'condition'), name='unique_stand_metric'),
        ),
    ]
