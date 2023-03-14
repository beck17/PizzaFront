import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from '../styles/components/Navbar.module.css'
import {selectorIsAuth, logout} from "../redux/slices/authSlice";
import {resetCart} from "../redux/slices/cartSlice";


const Navbar = () => {
    const isAuth = useSelector(selectorIsAuth)
    const isAdmin = useSelector((state) => state.auth?.data?.isAdmin || state.auth.data?.user?.isAdmin)
    const {quantity} = useSelector(state => state.cart)
    const {order} = useSelector(state => state.order)
    const dispatch = useDispatch()

    const handleClickLogout = () => {
        dispatch(logout())
        dispatch(resetCart())
        window.localStorage.removeItem('token')
    }

    return (
        <div className={styles.container}>
            <Link to='/'>
                <div className={styles.itemLogo}>
                    <img src="./img/logo.png" alt="logo" width="80" height="80"/>
                    <p className={styles.texts}>Одинцов Пицца</p>
                </div>
            </Link>

            <div className={styles.item}>
                <div className={styles.cart}>
                    <Link to='/cart'>
                        <img src="./img/cart.png" alt="cart" width="35px" height="35px"/>
                        <div className={styles.counter}>{quantity}</div>
                    </Link>
                </div>

                {
                    isAuth ? (
                    <>
                        {isAdmin && (
                            <Link to='/order'>
                                <button className={styles.button_logout}>Добавить продукт</button>
                            </Link>
                        )}
                        {
                            order._id && (
                                <Link to={`/order/${order._id}`}>
                                    <button className={styles.button_logout}>Мои заказы</button>
                                </Link>
                            )
                        }
                        <button className={styles.button_logout} onClick={handleClickLogout}>Выйти</button>
                    </>
                    ) : (
                        <Link to='/auth/login'>
                            <button className={styles.button}>Войти</button>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;