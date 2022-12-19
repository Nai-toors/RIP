import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { OrderCard } from '../components/OrderCard';
import { setInWork, setOrders } from '../store/reducers/orderReducer';

export const HomePage = () => {
    const { orders, inWork } = useSelector((store) => store.order);
    const dispatch = useDispatch();
    const [addressFromQ, setAddressFromQ] = useState('');
    const [addressToQ, setAddressToQ] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            await axiosInstance
                .get('/orders-depth/', { params: value })
                .then((response) => dispatch(setOrders(response?.data)));
        };
        const fetchUserOrders = async () => {
            await axiosInstance.get('/user-orders/').then((response) => dispatch(setInWork(response?.data)));
        };

        fetchOrders();
        fetchUserOrders();
    }, [dispatch, value]);

    const handleReset = () => {
        setAddressFromQ('');
        setAddressToQ('');
        setMax('');
        setMin('');
        setValue('');
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'> Главная</Link> <p>/</p>
            </div>
            <div>
                <div>
                    <p>Откуда</p>
                    <input
                        value={addressFromQ}
                        onChange={(e) => setAddressFromQ(e.target.value)}
                        placeholder='Введите значение...'
                    />
                </div>
                <div>
                    <p>Куда</p>
                    <input
                        value={addressToQ}
                        onChange={(e) => setAddressToQ(e.target.value)}
                        placeholder='Введите значение...'
                    />
                </div>
                <div>
                    <p>Минимальная стоимость</p>
                    <input
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                    />
                </div>
                <div>
                    <p>Максимальная стоимость</p>
                    <input
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                    />
                </div>
                <button onClick={() => setValue({ addressFromQ, addressToQ, min_cost: min, max_cost: max })}>
                    Искать
                </button>
                <button onClick={handleReset} className='ml-4'>
                    Сбросить
                </button>
            </div>
            {orders.length > 0 && (
                <div className='flex gap-2 flex-col'>
                    {orders.map(
                        (order) => !inWork.includes(order.id_order) && <OrderCard key={order.id_order} {...order} />
                    )}
                </div>
            )}
        </div>
    );
};
