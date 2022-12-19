import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../api';
import { setOrders } from '../store/reducers/orderReducer';

export const ManagerOrderCard = (props) => {
    const { inWork } = useSelector((store) => store.order);
    const dispatch = useDispatch();
    const [newAddressFrom, setNewAddressFrom] = useState(props.addressFrom);
    const [newAddressTo, setNewAddressTo] = useState(props.addressTo);
    const [newDescription, setNewDescription] = useState(props.description);
    const [newWeight, setNewWeight] = useState(props.weight);
    const [newPrice, setNewPrice] = useState(props.price);

    const handleUpdate = async () => {
        if (!!newAddressFrom && !!newAddressTo && !!newDescription && !!newWeight && !!newPrice) {
            const values = {
                addressFrom: newAddressFrom,
                addressTo: newAddressTo,
                description: newDescription,
                weight: newWeight,
                price: +newPrice,
            };
            await axiosInstance.put(`orders/${props.id_order}/`, values).then(async () => {
                await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
            });
        }
    };

    const handleDelete = async () => {
        const values = {
            id_order: props.id_order,
            address: props.address,
            description: props.description,
            weight: props.weight,
            price: props.price,
        };
        await axiosInstance.delete(`orders/${props.id_order}/`, values).then(async () => {
            await axiosInstance.get('orders-depth').then((response) => dispatch(setOrders(response?.data)));
        });
    };

    return (
        <div className='p-8 border w-[560px] flex flex-col justify-center items-center cursor-pointer my-8'>
            <img src={props.photo} alt={props.name} className='w-80 object-contain' />
            <div className='flex flex-col justify-between'>
                <div>
                    <p className='text-xl'>{inWork.includes(props.id_order) ? 'В работе' : 'Свободен'}</p>
                    <p className='font-bold'>Откуда: </p>
                    <textarea
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newAddressFrom}
                        onChange={(e) => setNewAddressFrom(e.target.value)}
                    />
                    <p className='font-bold'>Куда: </p>
                    <textarea
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newAddressTo}
                        onChange={(e) => setNewAddressTo(e.target.value)}
                    />
                    <p className='font-bold'>Описание: </p>
                    <textarea
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <p className='font-bold'>Вес: </p>
                    <input
                        className='inline-table w-full overflow-y-hidden resize-none'
                        value={newWeight}
                        onChange={(e) => setNewWeight(e.target.value)}
                    />

                    <p className='font-bold'>Стоимость: </p>
                    <input type='number' value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    <button onClick={handleUpdate} className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Сохранить
                    </button>
                    <button onClick={handleDelete} className='bg-red-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};
