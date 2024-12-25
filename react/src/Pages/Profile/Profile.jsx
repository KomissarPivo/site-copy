import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Components/Features/ProfileSlice';
import s from './Profile.module.css';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.loggedInUser);
    const isAuth = useSelector((state) => state.profile.isAuth);

    if (!isAuth) {
        return <div className={s.div}>Пожалуйста, авторизуйтесь для доступа к вашему профилю.</div>;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className={s.profileContainer}>
            <h1 className={s.h1}>Ваш профиль</h1>
            <p className={s.p}><strong>Имя:</strong> {user.nickname1}</p>
            <p className={s.p}><strong>Фамилия:</strong> {user.nickname2}</p>
            <p className={s.p}><strong>Почта:</strong> {user.email}</p>
            <button className={s.logoutButton} onClick={handleLogout}>Выйти из аккаунта</button>
        </div>
    );
};

export default Profile;