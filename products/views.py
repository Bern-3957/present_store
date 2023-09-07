from django.shortcuts import render
from django.views.generic.base import TemplateView
from django.views.generic import ListView

from django.http import JsonResponse
from django.views import View
import json
from .models import Products, Category, Subcategory


class IndexTemplateView(TemplateView):
    template_name = "products/index.html"


class CatalogTemplateView(TemplateView):
    template_name = "products/catalog.html"


# class ProductsCatalogListView(ListView):
#     model = Products
#     context_object_name = 'products'
#     template_name = "products/products_catalog.html"
#
#     def get_context_data(self, *, object_list=None, **kwargs):
#         context = super(ProductsCatalogListView, self).get_context_data(object_list=None, **kwargs)
#         context['products'] = Products.objects.all()
#
#         return context
#
#     def get_queryset(self):
#         return Products.objects.all()
#
#     def your_django_view(self):
#         if self.request.method == 'POST':
#             data = json.loads(self.request.body)
#             # Выполните сортировку товаров на основе данных из 'data'
#             # Верните ответ клиенту (например, список отсортированных товаров)
#             response_data = {
#                 'message': 'Данные успешно обработаны и отсортированы',
#                 # Добавьте нужные данные для клиента
#             }
#             print(response_data)
#             return JsonResponse(response_data)
#         else:
#             # Обработка GET-запроса или других случаев
#             # Верните HTML-шаблон или другой контент, который вам нужен
#             pass

class ProductsCatalogListView(ListView):
    model = Products
    context_object_name = 'products'
    template_name = "products/products_catalog.html"

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super(ProductsCatalogListView, self).get_context_data(object_list=None, **kwargs)
        context['products'] = Products.objects.all()

        return context

    def get_queryset(self):
        return Products.objects.all()

    def post(self, request, *args, **kwargs):
        # Получите данные о выбранных чекбоксах из запроса
        selected_checkboxes = request.POST.getlist('selected_checkboxes[]')

        # Осуществите фильтрацию товаров на основе выбранных чекбоксов (пример)
        # filtered_products = Products.objects.filter()
        #
        # # Сериализуйте отфильтрованные товары в формат JSON
        # data = [{'id': product.id, 'name': product.name} for product in filtered_products]
        if 'composition_checkbox_edible' in selected_checkboxes:
            filtered_products = Products.objects.filter(is_edible=True)
        else:
            filtered_products = Products.objects.all()
        data = [{'id': product.id, 'title': product.title, 'is_edible': product.is_edible, 'price': product.price} for product in filtered_products]
        print(data)

        return JsonResponse({'products': data})
