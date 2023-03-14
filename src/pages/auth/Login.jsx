import React, {useState} from 'react';
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from '../../styles/pages/Auth.module.css'
import {loginAuth, selectorIsAuth} from "../../redux/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectorIsAuth)

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const [err, setErr] = useState(false)

    const handleChange = (e) => {
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}))
    }

    const onClickForm = async () => {
        try {
            const data = await dispatch(loginAuth(inputs))
            window.localStorage.setItem('token', data.payload.token)
        }catch (e) {
            console.log(e);
            setErr(true)
        }
    }
    return (
        <div className={styles.container}>
            {isAuth && <Navigate to='/' />}
            <h1 className={styles.title}>Войти</h1>
            <div className={styles.form}>
                <input className={styles.input} name="email" onChange={handleChange} type="email" placeholder='Email'/>
                <input className={styles.input} name="password" onChange={handleChange} type="password" placeholder='Пароль'/>
                <button className={styles.btn} onClick={onClickForm}>Войти</button>
            </div>
            <p className={styles.text}>Нет аккаунта? <Link to='/auth/register'>
                     Зарегистрируйтесь
                </Link>
            </p>
            {err && <span>Ошибка при регистрации</span>}
        </div>
    );
};

export default Login;