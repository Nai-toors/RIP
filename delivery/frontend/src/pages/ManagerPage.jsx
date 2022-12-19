import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosInstance from '../api';
import { AddOrder } from '../components/AddOrder';
import { ManagerOrderCard } from '../components/ManagerOrderCard';
import { ManagerUserOrderCard } from '../components/ManagerUserOrderCard';
import { setInWorkManager, setOrders } from '../store/reducers/orderReducer';
import { setUserOrders } from '../store/reducers/userOrderReducer';

export const ManagerPage = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((store) => store.order);
    const { userOrders } = useSelector((store) => store.userOrder);
    const [type, setType] = useState('');
    const [orderType, setOrderType] = useState('all');
    useEffect(() => {
        const fetchOrders = async () => {
            await axiosInstance.get('orders-depth/').then((response) => {
                dispatch(setOrders(response?.data));
            });
        };
        const fetchUserOrders = async () => {
            await axiosInstance.get('user-orders-depth/').then((response) => {
                dispatch(setUserOrders(response?.data));
                dispatch(setInWorkManager(response?.data));
            });
        };
        fetchOrders();
        fetchUserOrders();
    }, [dispatch, type, orderType]);
    return (
        <div className='p-8 flex flex-col gap-4'>
            <div>
                <Link to='/'>Панель менеджера</Link>
            </div>
            <div className='flex gap-4'>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'Заказы' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('Заказы')}
                >
                    Заказы
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${
                        type === 'Заказы работников' && 'bg-gray-400 text-white'
                    }`}
                    onClick={() => setType('Заказы работников')}
                >
                    Заказы работников
                </button>
                <button
                    className={`py-1 px-2 rounded-md border ${type === 'newOrder' && 'bg-gray-400 text-white'}`}
                    onClick={() => setType('newOrder')}
                >
                    Добавить заказ
                </button>
            </div>
            <div>
                {type === 'Заказы' ? (
                    orders?.length > 0 && orders.map((order) => <ManagerOrderCard key={order.id_order} {...order} />)
                ) : type === 'Заказы работников' ? (
                    userOrders.length > 0 && (
                        <div>
                            <div className='flex gap-2 mb-4'>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'all' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('all')}
                                >
                                    Все
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Оформлен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Оформлен')}
                                >
                                    Оформлен
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Заказ в работе' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Заказ в работе')}
                                >
                                    Заказ в работе
                                </button>
                                <button
                                    className={`py-1 px-2 rounded-md border ${
                                        orderType === 'Заказ завершен' && 'bg-gray-400 text-white'
                                    }`}
                                    onClick={() => setOrderType('Заказ завершен')}
                                >
                                    Заказ завершен
                                </button>
                            </div>
                            {userOrders.map((userOrder) =>
                                orderType === 'all' ? (
                                    <ManagerUserOrderCard key={userOrder.id} {...userOrder} />
                                ) : (
                                    orderType === userOrder.status && (
                                        <ManagerUserOrderCard key={userOrder.id} {...userOrder} />
                                    )
                                )
                            )}
                        </div>
                    )
                ) : type === 'newOrder' ? (
                    <AddOrder resetType={() => setType('')} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
