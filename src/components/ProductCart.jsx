import {Link} from "react-router-dom";

import styles from '../styles/components/ProductCart.module.css'

const ProductCart = ({product}) => {

    return (
        <div className={styles.container}>
            <Link to={`/product/${product._id}`}>
                <img src={product.img} alt='pizza' width="200" height="200" />
            </Link>
            <h1 className={styles.title}>{product.title}</h1>
            <span className={styles.price}>от {product.prices[0].price} ₽</span>
            <p className={styles.desc}>
                {product?.desc}
            </p>
        </div>
    );
};

export default ProductCart;