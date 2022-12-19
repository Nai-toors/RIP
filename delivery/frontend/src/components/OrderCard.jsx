import dayjs from 'dayjs';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { setInWork, setOrders } from '../store/reducers/orderReducer';

export const OrderCard = (props) => {
    const { user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/order/${props.id_order}`);
    };

    const handleClick = () => {
        const addBasket = async () => {
            let order_date = new Date();
            order_date.setHours(order_date.getHours() - 3);
            const values = {
                status: 'Оформлен',
                order: +props.id_order,
                worker: user.id,
                order_date: dayjs(order_date).format('YYYY-MM-DD HH:mm:ss'),
            };
            await axiosInstance.post('user-orders/', values).then(
                async () =>
                    await axiosInstance
                        .get('orders-depth')
                        .then((response) => dispatch(setOrders(response?.data)))
                        .then(
                            async () =>
                                await axiosInstance
                                    .get('/user-orders/')
                                    .then((response) => dispatch(setInWork(response?.data)))
                        )
            );
        };
        addBasket();
    };
    return (
        <div className='p-8 border  flex max-w-[600px] flex-col cursor-pointer'>
            <img onClick={handleNavigate} src={props.photo} alt={props.name} />
            <p>
                <strong>Откуда: </strong>
                {props.addressFrom}
            </p>
            <p>
                <strong>Куда: </strong>
                {props.addressTo}
            </p>
            <p>
                <strong>Вес: </strong>
                {props.weight}
            </p>
            <p>
                <strong>Стоимость: </strong>
                {props.price}р.
            </p>
            <button className='bg-blue-400 w-full rounded-md mt-2 py-1 text-white' onClick={handleNavigate}>
                <strong>Подробнее</strong>
            </button>
            <button className='bg-blue-400 w-full rounded-md mt-2 py-1 text-white' onClick={handleClick}>
                <strong>Взять заказ</strong>
            </button>
        </div>
    );
};
