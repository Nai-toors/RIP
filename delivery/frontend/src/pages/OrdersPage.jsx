import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api';
import { UserOrderCard } from '../components/UserOrderCard';
import { setUserOrders } from '../store/reducers/userOrderReducer';

export const OrdersPage = () => {
    const { userOrders } = useSelector((store) => store.userOrder);
    const { authorized, user } = useSelector((store) => store.user);
    const navigate = useNavigate();
    const [type, setType] = useState('all');
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchBasket = async () => {
            const values = { id: user.id };
            await axiosInstance
                .get('user-orders-depth/', { params: values })
                .then((response) => dispatch(setUserOrders(response?.data)));
        };
        authorized ? fetchBasket() : navigate('/');
    }, [authorized, dispatch, navigate, user?.id]);

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='/'>Главная</Link> <p>/</p>
                <Link to='#'>Заказы</Link>
            </div>
            <div className='flex gap-2'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'all' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('all')}
                >
                    Все
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Оформлен' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Оформлен')}
                >
                    Оформлен
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Заказ в работе' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Заказ в работе')}
                >
                    Заказ в работе
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Заказ завершен' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Заказ завершен')}
                >
                    Заказ завершен
                </button>
            </div>
            <ul className='flex mt-8 flex-wrap gap-4'>
                {userOrders.map((userOrder) =>
                    !!userOrder?.order && type === 'all' ? (
                        <UserOrderCard key={userOrder.id} {...userOrder} />
                    ) : (
                        userOrder.status === type && <UserOrderCard key={userOrder.id} {...userOrder} />
                    )
                )}
            </ul>
        </div>
    );
};
