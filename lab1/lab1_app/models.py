from django.db import models

# Create your models here.

# Класс брендов автомобилей
class Brand(models.Model):
    name1 = models.CharField(max_length=50, verbose_name="Название производителя")
    Country = models.CharField(max_length=50, verbose_name="Страна")
    Description = models.TextField(blank=True, verbose_name="Описание")

    class Meta:
        managed = True
        db_table = 'brand'


# Класс пользователей
class Users(models.Model):
    login = models.CharField(max_length=50, verbose_name="Логин")
    password = models.CharField(max_length=50, verbose_name="Пароль")

    class Meta:
        managed: True
        db_table = 'users'


# Класс модели автомобиля (Foreign key к классу Brand)
class Car_model(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, verbose_name="id бренда")
    Year = models.IntegerField(verbose_name="Год выпуска")
    Cost = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Стоимость")

    class Meta:
        managed: True
        db_table = 'Car_model'



# Класс описания модели автомобиля
class Model_dyscription(models.Model):
    car_model = models.ForeignKey(Car_model, on_delete=models.CASCADE, default=1)
    Mileage = models.IntegerField(default=100, verbose_name="Пробег (км.)")
    Condition = models.CharField(max_length=30, verbose_name="Состояние автомобиля")
    Features = models.TextField(blank=True, verbose_name="Особенности автомобиля")

    class Meta:
        managed = True
        db_table = 'model_dyscription'



# Класс заказов (пользователей)
class Orders(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, default=1, verbose_name="id пользователя")
    car_model = models.ForeignKey(Car_model, on_delete=models.CASCADE, default=1, verbose_name="id модели")
    Order_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания товара")
    Status = models.CharField(max_length=30, verbose_name="Статус заказа")

    class Meta:
        managed = True
        db_table = 'orders'


#
class User_dyscription(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, verbose_name="id пользователя")
    Name = models.CharField(max_length=20, verbose_name="Имя пользователя")
    Phone_number = models.BigIntegerField(verbose_name="Телефон")