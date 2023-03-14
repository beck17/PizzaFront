import React from 'react';
import {useSelector} from "react-redux";

import {ProductCart} from "./";

import styles from '../styles/components/ProductList.module.css'

const ProductList = () => {
    const products = useSelector(state => state.products?.items)
    return (
        <>
            <h2>Пицца</h2>
            <div className={styles.wrapper}>
                {
                    products?.map(product => (
                        <ProductCart key={product._id} product={product}/>
                    ))
                }
            </div>
        </>
    );
};

export default ProductList;
