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
        
        # Apply search filter if 'meter_no' is provided in query params
        meter_no_query = request.GET.get('meter_no', "")
        if meter_no_query:
            meters_data = MetersDailyData.objects.filter(meter_no__icontains=meter_no_query)
        else:
            meters_data = MetersDailyData.objects.all()

        # Paginate the filtered data
        paginated_data = paginator.paginate_queryset(meters_data, request)

        # Serialize the data
        serializer = MetersDailyDataSerializer(paginated_data, many=True)
        response_data = serializer.data
        return paginator.get_paginated_response(response_data)

    except Exception as e:
        # Handle errors gracefully
        return Response({"error": str(e)}, status=500)
