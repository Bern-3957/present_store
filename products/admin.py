from django.contrib import admin
from .models import Category, Products, Subcategory


# Register your models here.


class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'title', 'slug', 'description', 'price', 'is_published',)
    # list_display = ('__all__',)
    list_display_links = ('id', 'title',)
    search_fields = ('title',)
    prepopulated_fields = {"slug": ("title",)}


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


class SubcategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Products, ProductsAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Subcategory, SubcategoryAdmin)
