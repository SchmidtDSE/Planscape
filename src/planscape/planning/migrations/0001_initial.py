# Generated by Django 4.1.10 on 2023-08-10 14:25

from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="PlanningArea",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("region_name", models.CharField(max_length=120)),
                ("name", models.CharField(max_length=120)),
                (
                    "geometry",
                    django.contrib.gis.db.models.fields.MultiPolygonField(
                        null=True, srid=4269
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="planning_areas",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "ordering": ["user", "-created_at"],
            },
        ),
        migrations.CreateModel(
            name="Scenario",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("name", models.CharField(max_length=120)),
                ("configuration", models.JSONField(default=dict)),
                (
                    "planning_area",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="scenarios",
                        to="planning.planningarea",
                    ),
                ),
            ],
            options={
                "ordering": ["planning_area", "-created_at"],
            },
        ),
        migrations.CreateModel(
            name="ScenarioResult",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("PENDING", "Pending"),
                            ("RUNNING", "Running"),
                            ("SUCCESS", "Success"),
                            ("FAILURE", "Failure"),
                        ],
                        default="PENDING",
                        max_length=16,
                    ),
                ),
                ("result", models.JSONField(null=True)),
                ("run_details", models.JSONField(null=True)),
                (
                    "scenario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="results",
                        to="planning.scenario",
                    ),
                ),
            ],
            options={
                "ordering": ["scenario", "-created_at"],
            },
        ),
        migrations.AddConstraint(
            model_name="scenario",
            constraint=models.UniqueConstraint(
                fields=("planning_area", "name"), name="unique_scenario"
            ),
        ),
        migrations.AddIndex(
            model_name="planningarea",
            index=models.Index(fields=["user"], name="planning_pl_user_id_e773f6_idx"),
        ),
        migrations.AddConstraint(
            model_name="planningarea",
            constraint=models.UniqueConstraint(
                fields=("user", "region_name", "name"), name="unique_planning_area"
            ),
        ),
    ]
