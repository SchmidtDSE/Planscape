# Generated by Django 4.1.1 on 2023-01-05 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plan', '0003_project_scenario_generatedprojectareas'),
    ]

    operations = [
        migrations.AddField(
            model_name='plan',
            name='creation_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]