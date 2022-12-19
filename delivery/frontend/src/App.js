import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import axiosInstance from './api';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { ManagerPage } from './pages/ManagerPage';
import { OrderPage } from './pages/OrderPage';
import { OrdersPage } from './pages/OrdersPage';
import { setUser } from './store/reducers/userReducer';

export const App = () => {
    const dispatch = useDispatch();
    const { user, authorized } = useSelector((store) => store.user);
    useEffect(() => {
        const getUser = async () => {
            await axiosInstance.get('api/user').then((response) => dispatch(setUser(response?.data)));
        };
        if (authorized || localStorage.getItem('access')) {
            getUser();
        }
    }, [dispatch, authorized]);
    return (
        <>
            <Header />
            {authorized ? (
                <Routes>
                    {user.is_superuser ? (
                        <>
                            <Route path='/' element={<ManagerPage />} />
                            <Route path='*' element={<Navigate to='/' replace />} />
                        </>
                    ) : (
                        <>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/order/:id' element={<OrderPage />} />
                            <Route path='/orders' element={<OrdersPage />} />
                            <Route path='*' element={<Navigate to='/' replace />} />
                        </>
                    )}
                </Routes>
            ) : (
                <AuthPage />
            )}
        </>
    );
};
