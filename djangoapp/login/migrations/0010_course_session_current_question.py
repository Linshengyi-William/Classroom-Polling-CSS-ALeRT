# Generated by Django 4.0.1 on 2022-04-15 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0009_remove_course_course_instructor_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course_session',
            name='current_question',
            field=models.IntegerField(default=0),
        ),
    ]