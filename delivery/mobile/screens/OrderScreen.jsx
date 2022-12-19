import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { axiosInstance } from '../api';
import { resetOrder, setOrder } from '../store/orderSlice';

export default function OrderScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store.order);
    useEffect(() => {
        async function getOneOrder() {
            await axiosInstance.get(`/orders-depth/${id}/`).then((response) => dispatch(setOrder(response?.data)));
        }
        getOneOrder();
        return () => {
            dispatch(resetOrder());
        };
    }, [dispatch]);
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Откуда: {order.addressFrom}</Text>
            <Text style={styles.text}>Куда: {order.addressTo}</Text>
            <Text style={styles.text}>Вес: {order.weight}</Text>
            <Text style={styles.text}>Описание: {order.description}</Text>
            <Text style={styles.text}>Стоимость: {order.price} р.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#fdfdfd',
        width: '100%',
        height: '100%',
        padding: 20,
        gap: 12,
        marginBottom: 8,
    },
    text: { color: '#111', fontSize: 16 },
});
