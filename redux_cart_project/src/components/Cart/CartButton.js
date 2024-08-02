import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice'
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const dispatch = useDispatch();
  // We are showing or hiding the cart
  // We need to dispatch an action which triggers this toggle method in our UI slice reducers map.
  // We need to execute toggle as a method here, these auto-generated actions, are action creator methods, & when you execute them,
  // they return action objects
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const toggleCartHandler = () => {
    // This returned action object is then dispatched
    dispatch(uiActions.toggle())

  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
