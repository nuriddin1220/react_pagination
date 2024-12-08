from django.urls import path
from .views import meters_daily_data_view


urlpatterns = [
    path('api/meters-daily-data/', meters_daily_data_view, name='meters_daily_data'),
]
