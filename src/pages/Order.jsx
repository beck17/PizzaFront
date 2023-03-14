import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

import axios from "../axios";
import styles from '../styles/pages/Order.module.css'

const Order = () => {
    const {id} = useParams()
    const [order,setOrder] = useState()
    const status = order?.status;

    useEffect(() => {
        const data = async () => {
            const res = await axios.get('api/order/'+id)
            setOrder(res.data)
        }
        data()
    }, [id])

    const statusClass = (index) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    };
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.row}>
                    <table className={styles.table}>
                        <tr className={styles.trTitle}>
                            <th>ID заказа</th>
                            <th>Покупатель</th>
                            <th>Адрес</th>
                            <th>Стоимость</th>
                        </tr>
                        <tr className={styles.tr}>
                            <td>
                                <span className={styles.id}>129837819237</span>
                            </td>
                            <td>
                                <span className={styles.name}>{order?.customer}</span>
                            </td>
                            <td>
                                <span className={styles.address}>{order?.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>{order?.total} ₽</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <img src="/img/paid.png" width={30} height={30} alt=""/>
                        <span>Оплата</span>
                        <div className={styles.checkedIcon}>
                            <img
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <img src="/img/bake.png" width={30} height={30} alt=""/>
                        <span>Готовка</span>
                        <div className={styles.checkedIcon}>
                            <img
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <img src="/img/bike.png" width={30} height={30} alt=""/>
                        <span>В пути</span>
                        <div className={styles.checkedIcon}>
                            <img
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <img src="/img/delivered.png" width={30} height={30} alt=""/>
                        <span>Доставлено</span>
                        <div className={styles.checkedIcon}>
                            <img
                                className={styles.checkedIcon}
                                src="/img/checked.png"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>Цена корзины</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Стоимость:</b>{order?.total} ₽
                    </div>
                    {/*<button disabled className={styles.button}>*/}
                    {/*    Оплатить*/}
                    {/*</button>*/}
                </div>
            </div>
        </div>
    );
};

export default Order;