import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {registerAuth, selectorIsAuth} from '../../redux/slices/authSlice'
import styles from '../../styles/pages/Auth.module.css'


const Register = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectorIsAuth)

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    })
    const [err, setErr] = useState(false)

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const onClickForm = async () => {
        try {
            const data = await dispatch(registerAuth(inputs))
            window.localStorage.setItem('token', data.payload.token)
        }catch (e) {
            console.log(e);
            setErr(true)
        }
    }
    return (
        <div className={styles.container}>
            {isAuth && <Navigate to='/'/>}
            <h1 className={styles.title}>Регистрация</h1>
            <div className={styles.form}>
                <input className={styles.input} onChange={handleChange} name="name" type="text" placeholder='Имя'/>
                <input className={styles.input} onChange={handleChange} name="email" type="email" placeholder='Email'/>
                <input className={styles.input} onChange={handleChange} name="password" type="password"
                       placeholder='Пароль'/>
                <input className={styles.input} onChange={handleChange} name="repeatPassword" type="password"
                       placeholder='Повторите пароль'/>
                <button className={styles.btn} onClick={onClickForm}>Зарегистрироваться</button>
            </div>
            <p className={styles.text}>У вас уже есть аккаунт? <Link to='/auth/login'>
                Войти
            </Link>
            </p>
            {err && <span className={styles.err}>Ошибка при регистрации</span>}
        </div>
    );
};

export default Register;