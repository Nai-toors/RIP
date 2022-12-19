import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { axiosInstance } from '../api';
import { setOrder } from '../store/reducers/orderReducer';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store.order);
    const { id } = useParams();
    const { user } = useSelector((store) => store.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            await axiosInstance.get(`orders-depth/${id}/`).then((response) => dispatch(setOrder(response?.data)));
        };

        fetchOrder();
    }, [dispatch, id, order.address]);

    const handleClick = () => {
        const addBasket = async () => {
            let order_date = new Date();
            order_date.setHours(order_date.getHours() - 3);
            const values = {
                status: 'Оформлен',
                order: +id,
                worker: user.id,
                order_date: dayjs(order_date).format('YYYY-MM-DD HH:mm:ss'),
            };
            await axiosInstance.post('user-orders/', values);
        };
        addBasket() && navigate('/');
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>{order.id_order}</Link>
            </div>
            {!!order && (
                <div className='p-8 border bg-gray-100 max-w-[720px] flex flex-col justify-center cursor-pointer mt-8'>
                    <p>
                        <strong>Откуда: </strong>
                        {order.addressFrom}
                    </p>
                    <p>
                        <strong>Куда: </strong>
                        {order.addressTo}
                    </p>
                    <p>
                        <strong>Описание: </strong>
                        {order.description}
                    </p>
                    <p>
                        <strong>Вес: </strong>
                        {order.weight}
                    </p>
                    <p>
                        <strong>Стоимость: </strong>
                        {order.price}р.
                    </p>
                    <button onClick={handleClick} className='bg-blue-400 w-full py-1 text-white rounded-md'>
                        <strong>Взять заказ</strong>
                    </button>
                </div>
            )}
        </div>
    );
};
