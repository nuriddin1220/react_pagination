# Generated by Django 5.1.4 on 2024-12-08 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MetersDailyData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('freeze_date', models.DateTimeField()),
                ('meter_no', models.CharField(max_length=255)),
                ('p0300', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('p0400', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('p0500', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('p0600', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
            ],
            options={
                'db_table': 'meters_daily_data',
                'managed': False,
            },
        ),
    ]
