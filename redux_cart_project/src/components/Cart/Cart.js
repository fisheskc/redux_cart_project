import { useSelector } from 'react-redux'

import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItems = useSelector(state => state.cart.items)
  // We create an item on the fly which we pass as an item to cartItem
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          // The CartItem expects the item prop which holds the object of this shape
          // In cart-slice.js, in the addItemToCart function, - if(!existingItem), we have a key property of name
          // In Cart.js, we should reference item.name, since item is the data coming from Redux. This is for every item
          // we are getting from Redux
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
