import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../api';
import { setUserOrders } from '../store/reducers/userOrderReducer';

export const ManagerUserOrderCard = (props) => {
    const dispatch = useDispatch();
    const handleUpdate = async (status) => {
        const values = { status };
        await axiosInstance.put(`user-orders/${props.id}/`, values).then(async () => {
            await axiosInstance.get('user-orders-depth/').then((response) => dispatch(setUserOrders(response?.data)));
        });
    };
    return (
        <div className='p-8 md:w-[720px] border rounded-md flex flex-col md:flex-row gap-8 items-start'>
            <div>
                <p>Работник: {props?.worker.email}</p>
                <p>Откуда: {props?.order.addressFrom}</p>
                <p>Куда: {props?.order.addressTo}</p>
                <p>Вес: {props?.order.weight}</p>
                <p>Описание: {props?.order.description}</p>
                <p>Стоимость: {props?.order.price}</p>
                <p>Дата добавления: {dayjs(props.order_date).format('YYYY.MM.DD HH:mm')}</p>
                <select onChange={(e) => handleUpdate(e.target.value)}>
                    <option disabled>Статус заказа</option>
                    <option selected={props.status === 'Оформлен'} value='Оформлен'>
                        Оформлен
                    </option>
                    <option selected={props.status === 'Заказ в работе'} value='Заказ в работе'>
                        Заказ в работе
                    </option>
                    <option selected={props.status === 'Заказ завершен'} value='Заказ завершен'>
                        Заказ завершен
                    </option>
                </select>
            </div>
        </div>
    );
};
