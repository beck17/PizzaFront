import React, {useState} from 'react';

import styles from '../styles/pages/Cart.module.css'
import {useDispatch, useSelector} from "react-redux";
import {resetCart} from "../redux/slices/cartSlice";
import OrderModal from "../components/OrderModal";
import {selectorIsAuth} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectorIsAuth)
    const navigate = useNavigate()
    const {products} = useSelector(state => state.cart)
    const {total} = useSelector(state => state.cart)

    const [isOpen, setIsOpen] = useState(false)

    if (products.length <= 0) {
        return <h1>Корзина пустая</h1>
    }

    const notAuthClick = () => {
        navigate("/auth/login")
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tr className={styles.trTitle}>
                        <th>Продукт</th>
                        <th>Название</th>
                        <th>Топинги</th>
                        <th>Цена</th>
                        <th>Кол-во</th>
                        <th>Стоимость</th>
                    </tr>
                    {
                        products.map(product => (
                            <tr className={styles.tr}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                                      <span className={styles.extras}>
                                        {
                                            product.extras?.map(extra => (
                                                extra.text + ', '
                                            ))
                                        }
                                      </span>
                                </td>
                                <td>
                                    <span className={styles.price}>{product.price} ₽</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>{product.price * product.quantity} ₽</span>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Цена корзины</h2>

                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Стоимость:</b>{total} ₽
                    </div>
                    <button className={styles.button} style={{color: 'white'}} disabled>Оплатить картой</button>
                    <span style={{textAlign: 'center', color: 'gray', fontSize: '12px'}}>Недоступно</span>
                    {
                        isAuth ? (
                            <button className={styles.button} onClick={() => setIsOpen(true)}>Оплатить наличкой</button>
                        ) : (
                            <button className={styles.button} onClick={notAuthClick}>Оплатить наличкой</button>
                        )
                    }
                    <button className={styles.button} onClick={() => dispatch(resetCart())}>Очистить козину</button>
                </div>
            </div>
            {isOpen && <OrderModal setIsOpen={setIsOpen}/>}
        </div>
    );
};

export default Cart;