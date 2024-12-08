from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MetersDailyData
from .serializers import MetersDailyDataSerializer
from .pagination import MetersDailyDataPagination

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import MetersDailyData
from .serializers import MetersDailyDataSerializer
from .pagination import MetersDailyDataPagination


@api_view(['GET'])
def meters_daily_data_view(request):
    try:
        # Set up pagination
        paginator = MetersDailyDataPagination()
        meters_data = MetersDailyData.objects.all()
        paginated_data = paginator.paginate_queryset(meters_data, request)
        
        # Serialize data
        serializer = MetersDailyDataSerializer(paginated_data, many=True)
        
        # Send paginated response
        return paginator.get_paginated_response(serializer.data)

    except Exception as e:
        # Handle errors gracefully
        return Response({"error": str(e)}, status=500)

