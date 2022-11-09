from django.shortcuts import render
# Create your views here.
from django.http import HttpResponse

from datetime import date

def hello(request):
    return render(request, 'index.html', { 'data' : {
        'current_date': date.today(),
        'list': ['python', 'django', 'html', 'popapa']
    }})

dictit_1 = [
    {'title': 'Заказы', 'info': 'адреса заказов', 'id': 1, 'info1': 'заказах'},
    {'title': 'Поставщики', 'info': 'информация о них', 'id': 2, 'info1': 'поставщиках'},
    {'title': 'Транспорт', 'info': 'кто возит то?', 'id': 3, 'info1': 'транспорте'},
]

def GetMainPath(request):
    return render(request, 'orders.html', {'data' : {'orders': dictit_1 }})

dictit_2 = {'1': 'заказах',
                 '2': 'поставщиках',
                 '3': 'транспорте'}



def GetOrder(request, id):
    return render(request, 'order.html', {'data' : {
        'current_date': date.today(),
        'id': id,
        'url': '/Photos/' + str(id) + '.jpg',
    }})