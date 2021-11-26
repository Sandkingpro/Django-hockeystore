import datetime
import json
from collections import namedtuple

import demjson as demjson
from django.conf import settings
from django.conf.global_settings import DEFAULT_FROM_EMAIL
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.core.cache import cache
from django.core.mail import send_mail
from django.http import HttpResponse

from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .forms import LoginForm
from .models import Product


# Create your views here.


def index(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, 'main/MainPage.html', context)


def brend(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, 'main/BrendsPage.html', context)


def about(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, 'main/CompanyPage.html', context)


def contact(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, 'main/ContactsPage.html', context)


def basket(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    if request.POST.get('count_plus') != None:
        loaded_r = json.loads(json.dumps(request.POST.get('count_plus')))
        item = demjson.decode(loaded_r)
        value = request.session['cart']
        cart = json.loads(value)
        for i in range(len(cart)):
            if (cart[i]['img'] == item['img']):
                cart[i] = item
                break
        request.session['cart'] = json.dumps(cart)
        request.session.save()

    if request.POST.get('del_item') != None:
        r = json.dumps(request.POST.get('del_item'))
        loaded_r = json.loads(r)
        item = demjson.decode(loaded_r)
        value = request.session['cart']
        cart = json.loads(value)
        cart.remove(item)
        request.session['cart'] = json.dumps(cart)
        request.session.save()
    # if(request.COOKIES.get('basket')!=None):
    # value=request.COOKIES.get('basket')
    # basket=json.loads(value)
    # context={'basket':basket}
    # print(request.session.keys())
    if 'cart' in request.session:
        value = request.session['cart']
        basket = json.loads(value)
        if ('username' in request.session):
            context = {'username': 'Пользователь:  ' + request.session['username'], 'basket': basket, 'is_login': True}
        else:
            context = {'username': 'Авторизоваться', 'basket': basket, 'is_login': False}
    return render(request, 'main/Basket.html', context)


def catalog_Skates(request):
    flag = False
    basket = []
    save_basket = []
    products = Product.objects.filter(category=1)
    r = json.dumps(request.POST.get('basket'))
    loaded_r = json.loads(r)
    if (loaded_r != None):
        basket = demjson.decode(loaded_r)
    # if(request.COOKIES.get('basket')!=None):
    # save_basket=json.loads(request.COOKIES.get('basket'))
    if 'cart' in request.session:
        save_basket = json.loads(request.session['cart'])
    result = basket + save_basket
    new_list = []
    if (result != None):
        names = []
        result.sort(key=lambda k: k['name'])
        for a in result:
            if (a not in new_list and a['name'] not in names):
                new_list.append(a)
                names.append(a['name'])
    result = new_list
    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Коньки",
            'flag': flag,
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True

        }
    else:
        context = {
            'pr': products,
            'title': "Коньки",
            'flag': flag,
            'is_login': False,

        }

    response = render(request, 'main/Skates.html', context)
    if (loaded_r != None and result != None):
        # response.set_cookie('basket', json.dumps(result), max_age=70000)
        request.session['cart'] = json.dumps(result)
        request.session.save()
    return response


def catalog_Crags(request):
    products = Product.objects.filter(category=2)
    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Краги",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Краги",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def catalog_Bib(request):
    products = Product.objects.filter(category=3)

    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Нагрудники",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Нагрудники",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def catalog_Trousers(request):
    products = Product.objects.filter(category=4)

    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Трусы",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Трусы",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def catalog_armrests(request):
    products = Product.objects.filter(category=6)

    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Подлокотники",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Подлокотники",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def catalog_stricks(request):
    products = Product.objects.filter(category=5)

    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Клюшки",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Клюшки",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def catalog_helmets(request):
    products = Product.objects.filter(category=7)

    if ('username' in request.session):
        context = {
            'pr': products,
            'title': "Шлемы",
            'username': 'Пользователь:  ' + request.session['username'],
            'is_login': True,

        }
    else:
        context = {
            'pr': products,
            'title': "Шлемы",
            'is_login': False,

        }
    return render(request, 'main/Skates.html', context)


def tag_name(context):
    request = context['request']
    result = request.COOKIES.get('basket')
    return result


def upload(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    response = render(request, 'main/Basket.html',context)
    if request.method == 'POST':
        # response.delete_cookie('basket')
        if ('cart' in request.session):
            del request.session['cart']
            request.session.save()
    return response


def postUser(request):
    form = LoginForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            request.session['username'] = username
            return render(request, 'main/MainPage.html',
                          {'form': form, 'username': 'Пользователь:' + request.session['username'], 'is_login': True})
    return render(request, 'main/login.html', {'form': form, })


def order(request):
    if ('username' in request.session):
        context = {'username': 'Пользователь:  ' + request.session['username'], 'is_login': True}
    else:
        context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, 'main/Order.html', context)


def logout_view(request):
    logout(request)
    context = {'username': 'Авторизоваться', 'is_login': False}
    return render(request, "main/MainPage.html", context)
