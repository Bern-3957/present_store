from django.db import models


# Create your models here.

class Products(models.Model):
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    subcategory = models.ForeignKey('Subcategory', on_delete=models.SET_NULL, null=True, blank=True)

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)

    is_published = models.BooleanField(default=True, verbose_name='Опубликовано')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_edible = models.BooleanField(default=False)  # True - съедобный, False - несъедобный
    purpose = models.CharField(max_length=100)  # Например: "для кухни", "для бани", "в гости", "косметические наборы"
    price = models.DecimalField(max_digits=10, decimal_places=2)
    visits_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class Category(models.Model):
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)

    def __str__(self):
        return self.title

class Subcategory(models.Model):
    title = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True, unique=True)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
