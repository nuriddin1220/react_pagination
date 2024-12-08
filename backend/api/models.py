from django.db import models

# Create your models here.


from django.db import models


class MetersDailyData(models.Model):
    freeze_date = models.DateTimeField()
    meter_no = models.CharField(max_length=255,primary_key=True)
    p0300 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    p0400 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    p0500 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    p0600 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    class Meta:
        db_table = 'meters_daily_data'
        managed = False
