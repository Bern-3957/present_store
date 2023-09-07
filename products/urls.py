from django.urls import path, include
from .views import CatalogTemplateView, ProductsCatalogListView

app_name = 'products'
urlpatterns = [
    path('catalog/', CatalogTemplateView.as_view(), name="catalog"),
    path('catalog/products_catalog/', ProductsCatalogListView.as_view(), name="products_catalog"),
    path('catalog/products_catalog/filter_products/', ProductsCatalogListView.as_view(), name="filter_products"),
]