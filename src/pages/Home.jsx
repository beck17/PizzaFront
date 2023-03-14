import React from 'react';

import {ProductList} from "../components";

import styles from '../styles/components/ProductList.module.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ЛУЧШАЯ ПИЦЦЕРИЯ В СЫКТЫВКАРЕ</h1>
            <p className={styles.desc}>
                Как ты можешь ненавидеть чувака, который открыл ресторан для вас, место, чтобы вы покушали?
            </p>
            <ProductList/>
        </div>
    );
};

export default Home;
