# pagination.py
from rest_framework.pagination import PageNumberPagination


class MetersDailyDataPagination(PageNumberPagination):
    page_size = 10  # Number of records per page
    page_size_query_param = 'page_size'  # Allows client to set custom page size
    max_page_size = 50  # Limits the maximum number of records per page
