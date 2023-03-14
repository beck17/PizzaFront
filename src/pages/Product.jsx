import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from '../styles/pages/Product.module.css'
import {getOneProduct} from "../redux/slices/productSlice";
import {addProductToCart} from "../redux/slices/cartSlice";

const Product = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {product} = useSelector(state => state.products)
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const {payload} = await dispatch(getOneProduct(id))
            setPrice(payload.prices[0].price)
        }
        fetchProduct().catch(e => console.log(e))
    }, [dispatch, id])

    const buyProduct = () => {
        const {_id, desc, type, foodValues, extraOptions, ...data} = product
        dispatch(addProductToCart({...data, quantity, price, extras}))
    }

    const changePrice = (number) => {
        setPrice((prev) => prev + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = product?.prices[sizeIndex]?.price - product?.prices[size]?.price;
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;
        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };


    if (!product) {
        return (<h1>Loading..</h1>)
    }

    return (

        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <img src={product.img} alt='pizza' />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{product.title}</h1>
                <span className={styles.price}>{`${price} ₽ | ${product?.prices[size]?.weight} г`}</span>
                <p className={styles.desc}>{product.desc + extras.map(extra => ', ' + extra.text.toLowerCase())}</p>

                <h3 className={styles.choose}>Выберите размер</h3>
                <div className={styles.sizes}>

                    {
                        product?.prices?.map((item, index) => (
                            <div className={styles.size} onClick={() => handleSize(index)}
                                 key={item._id}>
                                <img src="/img/size.png" alt=""/>
                                <span
                                    className={size === index ? styles.numberActive : styles.number}>{item.size} см.</span>
                            </div>

                        ))
                    }
                </div>
                <h3 className={styles.choose}>Выберите дополнительные ингредиенты</h3>
                <div className={styles.ingredients}>
                    {
                        product?.extraOptions?.map(option => (
                            <div className={styles.option} onChange={(e) => handleChange(e, option)}
                                 key={option.text}
                            >
                                <input
                                    type="checkbox"
                                    id={option.text}
                                    name={option.text}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="double">{option.text} ({option.price})</label>
                            </div>
                        ))
                    }
                </div>
                {
                    product && (
                        <>
                            <h3 className={styles.choose}>Пищевая ценность на 100 г.</h3>
                            <p className={styles.desc}>Энерг. ценность: {product.foodValues.calories} ккал</p>
                            <p className={styles.desc}>Белки: {product.foodValues.proteins} г.</p>
                            <p className={styles.desc}>Жиры: {product.foodValues.fats} г.</p>
                            <p className={styles.desc}>Углеводы: {product.foodValues.carbohydrates} г.</p>
                        </>

                    )
                }

                <div className={styles.add}>
                    <input type="number" defaultValue={1} min={1} max={10}
                           className={styles.quantity} onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button className={styles.button} onClick={buyProduct}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default Product;