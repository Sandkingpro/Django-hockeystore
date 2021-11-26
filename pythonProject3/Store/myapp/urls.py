from django.conf.urls import url

from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('', views.index, name="home"),
    path('Brends', views.brend, name="brends"),
    path('Company', views.about, name="company"),
    path('Contacts', views.contact, name="contacts"),
    path('Коньки', views.catalog_Skates, name="catalog"),
    path('Basket', views.basket, name="basket"),
    path('Краги', views.catalog_Crags, name='catalog_crags'),
    path('Нагрудники', views.catalog_Bib, name='catalog_bib'),
    path('Трусы', views.catalog_Trousers, name='catalog_trousers'),
    path('Подлокотники', views.catalog_armrests, name='catalog_armrests'),
    path('Клюшки', views.catalog_stricks, name='catalog_sticks'),
    path('Шлемы', views.catalog_helmets, name='catalog_helmets'),
    path('upload', views.upload, name='upload'),
    path('login', views.postUser, name='login'),
    path('Order',views.order,name='order'),
    path('logout',views.logout_view,name='logout'),

]
