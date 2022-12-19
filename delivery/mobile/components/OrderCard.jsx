import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';

export default function OrderCard({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Заказ', { id: props.id_order });
    };

    return (
        <View style={styles.card}>
            <Text style={styles.text}>Откуда: {props.addressFrom}</Text>
            <Text style={styles.text}>Куда: {props.addressTo}</Text>
            <Text style={styles.text}>Вес: {props.weight}</Text>
            <Text style={styles.text}>Стоимость: {props.price} р.</Text>
            <Button title='Подробнее' onPress={handlePress} />
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
        marginBottom: 8,
        padding: 20,
    },
    text: { color: '#111', fontSize: 16 },
});
