from django.contrib import admin
from django.urls import path 
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('search/', views.search, name='search'),

    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('checkout/', views.checkout, name='checkout'),

    path('products/', views.products, name='products'),
    path('products/<str:id>/', views.product_detail, name= 'product-detail'),
    # path('product_detail/', views.product_detail, name='product_detail'),
    path('products-filter/',views.products_filter,name="products_filter"),
    path('category-product-list/<int:cat_id>',views.category_product_list,name='category-product-list'),

    path('terms/', views.terms, name='terms'),
    

  
    
    
    
]
#  {% static '' %}