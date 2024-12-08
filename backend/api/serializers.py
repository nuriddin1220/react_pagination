from rest_framework import serializers
from .models import MetersDailyData


class MetersDailyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetersDailyData
        fields = '__all__'
