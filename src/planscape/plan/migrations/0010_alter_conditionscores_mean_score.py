# Generated by Django 4.1.3 on 2023-01-25 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("plan", "0009_conditionscores"),
    ]

    operations = [
        migrations.AlterField(
            model_name="conditionscores",
            name="mean_score",
            field=models.FloatField(null=True),
        ),
    ]
