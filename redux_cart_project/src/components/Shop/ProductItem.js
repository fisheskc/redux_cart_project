import { useDispatch } from 'react-redux'

import { cartActions } from '../../store/cart-slice'
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {

  const dispatch = useDispatch();
  
  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    
    }
  
    dispatch(cartActions.addItemToCart({
    // The modern JS shortcut, where the key name & the variable name holding the value are equal,
    // we can omit the right side of the property assignment & it is automatically expanded behind the scenes.
    id,
    title,
    price
    }))
  

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
