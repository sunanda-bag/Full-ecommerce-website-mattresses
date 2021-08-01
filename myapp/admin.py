from django.contrib import admin
from .models import *

# Register your models here.
# admin.site.register(Product)
# admin.site.register(ProductImage)

admin.site.register(Category)

admin.site.register(Label)

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage
 


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display=('id','title','category','label','status','is_featured','is_new')
    list_editable=('status','is_featured','is_new')
    inlines = [ProductImageAdmin]
 
    class Meta:
       model = Product

