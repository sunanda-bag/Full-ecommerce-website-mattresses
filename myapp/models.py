from django.db import models
from django.shortcuts import reverse




class Category(models.Model):
    title = models.CharField(max_length=100)


    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural='Categories'


class Label(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Product(models.Model):

    title = models.CharField(max_length=200, null=True)
    price = models.DecimalField(max_digits=8,decimal_places=2)
    discount_price = models.FloatField(blank=True, null=True)
   
    category=models.ForeignKey(Category,on_delete=models.CASCADE)
    label = models.ForeignKey(Label,on_delete=models.CASCADE,null=True,blank=True)

    is_new=models.BooleanField(default=False)
    is_featured=models.BooleanField(default=False)
    status=models.BooleanField(default=True)

    # slug = models.SlugField()
    description = models.TextField()
    short_description = models.TextField()
   
    image = models.ImageField(upload_to='home_app', null=True, blank=True)

    def get_absolute_url(self):
        return reverse("home_app:product-detail", kwargs={
            'id': self.id
        })

    @property
    def imageURL(self):
        try:
            url = self.image.url
        except:
            url = ''
        return url

    def __str__(self):
        return self.title



class ProductImage(models.Model):
    product = models.ForeignKey(Product, default=None, on_delete=models.CASCADE)
    images = models.ImageField(upload_to='home_app', null=True, blank=True)

    def __str__(self):
        return self.product.title

    @property
    def imageURL(self):
        try:
            url = self.images.url
        except:
            url = ''
        return url