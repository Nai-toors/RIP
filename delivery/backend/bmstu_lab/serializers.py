from rest_framework import serializers
from rest_framework.fields import CharField
from bmstu_lab.models import *

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'

class OrdersDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
        depth = 2

class UserOrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrder
        fields = '__all__'


class UserOrdersDepthSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrder
        fields = '__all__'
        depth=2

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class LoginRequestSerializer(serializers.Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)
