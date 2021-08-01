from django.shortcuts import redirect, render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, View
from .models import *
from django.core.mail import send_mail

from django.http.response import JsonResponse
from django.template.loader import render_to_string
from django.core.mail import send_mail


def home(request):

    products = Product.objects.all()
    featured_prod=Product.objects.filter(is_featured=True).order_by('-id')
    new_prod=Product.objects.filter(is_new=True).order_by('-id')
    categories=Category.objects.all()

    context = {'featured_prod':featured_prod, 'products':products, 'new_prod':new_prod,'categories':categories}
    return render(request,'index.html',context)


# Search
def search(request):

	q=request.GET['q']
	data=Product.objects.filter(title__icontains=q).order_by('-id')
	return render(request,'search.html',{'data':data})


def about(request):

    categories=Category.objects.all()
    context = {'categories':categories}
    return render(request, 'about.html', context)


def products(request):

    categories= Category.objects.all()
    labels= Label.objects.all()
    products= Product.objects.all()
    # products = myFilter.qs

    data = {'products':products,'labels':labels,'categories':categories}
    return render(request,'products.html',data) 


def products_filter(request):

    categories=request.GET.getlist('category[]')   
    # labels=request.GET.getlist('label[]')
    productsall=Product.objects.all().order_by('-id').distinct()
    print(productsall)
    if len(categories)>0:
        productsall=productsall.filter(category__id__in=categories).distinct()
    # if len(labels)>0:
    #     productsall=productsall.filter(label__id__in=labels).distinct()

    t=render_to_string('products_filter.html',{'data':productsall})
    return JsonResponse({'data':t})



def product_detail(request,id):
    
    categories=Category.objects.all()
    product = Product.objects.get(id=id)
    products_all = Product.objects.all()
    related_products = Product.objects.filter(category=product.category).exclude(id=id)[:4]

    context = {'product':product, 'products_all':products_all,'categories':categories,'related_products':related_products}
    return render(request,'product_detail.html',context)


# Products according to the category 
def category_product_list(request,cat_id):

    categories=Category.objects.all()
    category_with_id=Category.objects.get(id=cat_id)
    cat_prods=Product.objects.filter(category=category_with_id).order_by('-id')

    return render(request,'category_product_list.html',{
            'categories':categories,
			'cat_prods':cat_prods,
            'category_with_id':category_with_id,
			})

            
def contact(request):

    categories=Category.objects.all()

    if request.method == 'POST':
        name = request.POST['name']
        email = request.POST['email']
        phone = request.POST['phone']
        message = request.POST['message']
        message_body = f'''Hey, I am {name}.My phone number is {phone}.

        {message}
        '''
        # send an email 
        send_mail(
            f'Message from {name} ',
            message_body,
            email,
            ['testerwebsite007@gmail.com'],
            fail_silently=False,
        )
        context = {'name':name,'categories':categories}

    else:
        context = {'categories':categories}
    return render(request, 'contact.html', context)


def checkout(request):
    return render(request, 'checkout.html')




def terms(request):
    return render(request, 'terms.html')