from django.db import models
from django.contrib.auth.models import User

class Orders(models.Model):
    id_order = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100, blank=True, null=True)
    addressFrom = models.CharField(max_length=200, blank=True, null=True)
    addressTo = models.CharField(max_length=200, blank=True, null=True)
    weight = models.CharField(max_length=20, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'orders'

class UserOrder(models.Model):
    order = models.ForeignKey(Orders, on_delete=models.DO_NOTHING)
    worker = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    status = models.TextField()
    order_date = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'userorders'
