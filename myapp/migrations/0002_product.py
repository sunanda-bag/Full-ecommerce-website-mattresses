# Generated by Django 3.2.5 on 2021-07-18 09:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=8)),
                ('discount_price', models.FloatField(blank=True, null=True)),
                ('is_new', models.BooleanField(default=False)),
                ('is_featured', models.BooleanField(default=False)),
                ('status', models.BooleanField(default=True)),
                ('description', models.TextField()),
                ('short_description', models.TextField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='home_app')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.category')),
            ],
        ),
    ]
