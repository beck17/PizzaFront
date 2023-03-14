import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderData} from "../redux/slices/orderSlice";
import {useNavigate} from 'react-router-dom'

import styles from '../styles/components/OrderModal.module.css';

const OrderModal = ({setIsOpen}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {products, total} = useSelector(state => state.cart)
    const [inputs, setInputs] = useState({
        customer: '',
        phone: '',
        address: '',
        products: products,
        total: total
    })

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async () => {
        dispatch(fetchOrderData(inputs))
            .then(res => navigate(`/order/${res.payload._id}`))
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span className={styles.exit} onClick={() => setIsOpen(false)}>X</span>
                <h1 className={styles.title}>Введите данные</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Имя Фамилия</label>
                    <input type="text" className={styles.input}
                           placeholder="Богдан Одинцов" name='customer'
                           onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Номер телефона</label>
                    <input type="number" className={styles.input}
                           placeholder="+79042253466" name='phone'
                           onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Адрес</label>
                    <textarea rows={5} className={styles.textarea}
                              placeholder='г.Сыктывкар ул.Печорская д.28'
                              name='address' onChange={(e) => handleChange(e)}
                    />
                </div>
                <button className={styles.button} onClick={handleClick}>Оформить</button>
            </div>
        </div>
    );
};

export default OrderModal;