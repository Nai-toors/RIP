import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { setUserOrders } from '../store/reducers/userOrderReducer';

export const UserOrderCard = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.user);
    const handleDelete = (id) => {
        const fetchDelete = async (id) => {
            const values = { id: user.id };
            await axiosInstance
                .delete(`user-orders/${id}/`)
                .then(
                    async () =>
                        await axiosInstance
                            .get('user-orders-depth/', { params: values })
                            .then((response) => dispatch(setUserOrders(response?.data)))
                );
        };
        fetchDelete(id);
    };
    return (
        <div className='p-4 border rounded-md max-w-[720px]'>
            <p>Откуда: {props?.order.addressFrom}</p>
            <p>Куда: {props?.order.addressTo}</p>
            <p>Вес: {props?.order.weight}</p>
            <p>Описание: {props?.order.description}</p>
            <p>Стоимость: {props?.order.price}</p>
            <p>Дата добавления: {dayjs(props.order_date).format('YYYY.MM.DD HH:mm')}</p>
            <p>Статус: {props.status}</p>
            {props.status !== 'Заказ завершен' && (
                <button onClick={() => handleDelete(props.id)} className='bg-red-400 text-white w-full rounded-md'>
                    Отменить
                </button>
            )}
        </div>
    );
};
