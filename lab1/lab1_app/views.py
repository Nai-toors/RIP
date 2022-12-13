
from django.shortcuts import render
from datetime import date
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound
from lab1_app.models import Brand, Car_model

# Create your views here.



# здесь модель (управление данными, хранение данных и прочее закулисами)

from datetime import date

# для проб из 1 методы, не нужно
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


def MainPath(request):
    return render(request, 'orders.html', { 'data' : {
        'info': Brand.objects.all()
    }})

def GetOrder(request, id):
    return render(request, 'order.html', {'data' : {
        'title': Car_model.objects.filter(id=id)[0],
        'url': '/Photos/' + str(id) + '.jpg',
    }})


def send_delete(request, id):
    try:
        import MySQLdb
        db = MySQLdb.connect(
            host="localhost",
            user="dbuser",
            passwd="123",
            db="first_db"
        )
        c = db.cursor()
        delete = f"DELETE FROM brand where id={id}"
        c.execute(delete)
        db.commit()
        c.close()
        db.close()
        return render(request, 'orders.html', {'data': {
            'title': Brand.objects.all()
        }})
    except Brand.DoesNotExist:
        return HttpResponseNotFound("<h2>Auto not found</h2>")








# этот словарь не используется
dictit_2 = {'1': 'заказах',
                 '2': 'поставщиках',
                 '3': 'транспорте'}





