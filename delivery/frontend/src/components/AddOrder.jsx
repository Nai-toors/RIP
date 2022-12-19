import React, { useState } from 'react';
import axiosInstance from '../api';

export const AddOrder = ({ resetType }) => {
    const [addressFrom, setAddressFrom] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!!price && !!addressFrom && !!addressTo && !!weight && !!description) {
            const values = { addressFrom, addressTo, weight, description, price };
            await axiosInstance.post('orders/', values);
            resetType();
        }
    };
    return (
        <form onSubmit={handleSubmit} className='md:w-[600px] flex flex-col gap-1'>
            <p className='font-bold'>Откуда: </p>
            <textarea
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={addressFrom}
                onChange={(e) => setAddressFrom(e.target.value)}
            />
            <p className='font-bold'>Куда: </p>
            <textarea
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={addressTo}
                onChange={(e) => setAddressTo(e.target.value)}
            />
            <p className='font-bold'>Описание: </p>
            <textarea
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <p className='font-bold'>Вес: </p>
            <input
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <p className='font-bold'>Стоимость: </p>
            <input
                type='number'
                className='inline-table md:w-[600px] overflow-y-hidden resize-none border rounded-md px-2 h-7 outline-none'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button type='submit' className='bg-blue-400 px-10 py-1 mt-2 w-full text-white rounded-md'>
                Добавить
            </button>
        </form>
    );
};
