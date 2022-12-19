import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import OrderCard from '../components/OrderCard';
import { setOrders } from '../store/orderSlice';

export default function OrdersScreen({ navigation }) {
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store.order);

    useEffect(() => {
        async function getAllOrders() {
            await axiosInstance.get('/orders-depth/').then((response) => dispatch(setOrders(response?.data)));
        }
        getAllOrders();
    }, [dispatch]);

    return (
        <ScrollView>
            <View>
                {!!orders &&
                    orders.map((order) => <OrderCard key={order.id_order} {...order} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}
