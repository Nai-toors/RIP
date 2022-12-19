import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../store/reducers/userReducer';

export const Header = () => {
    const { authorized, user } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const handleClick = () => {
        authorized && dispatch(logout());
    };
    return (
        <div className='flex justify-between w-full py-4 px-10'>
            <Link to='/'>Delivery</Link>
            <div className='flex gap-4'>
                {authorized && !user?.is_superuser && <Link to='/orders'>Мои заказы</Link>}
                {authorized && user?.username && <p>{user.username}</p>}
                {!location.pathname.includes('auth') && (
                    <button onClick={handleClick}>{authorized ? 'Выйти' : ''}</button>
                )}
            </div>
        </div>
    );
};
