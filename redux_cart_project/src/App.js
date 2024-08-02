// Rendering the notification component, we use Fragment, because we use side-by-side to layout, as adjacent JSX is not allowed
import { Fragment, useEffect } from 'react';
// We extract data from Redux, the useSelector hook
import { useSelector, useDispatch } from 'react-redux'
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions'
// This will be initialized when this file is parsed for the first time.
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  // We return the data cartIsVisible property value. We need to drill into that state slice & use index.js, reducer: object, key - ui to drill
  // into that part of the state. We can now use {showCart && <Cart />} to conditionally show/hide this cart component
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  // useSelector sets up a subscription to redux, so whenever our Redux store does change, this component function will be re-executed & you will get the latest state 
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification)
  // This useEffect will only run if this component was rendered for the first time & this is our main component
  useEffect(() => {
    // We dispatch this custom cart-action whenever our application starts
    dispatch(fetchCartData())
  },[dispatch])

  // We want to dispatch the show notification action when we start sending the data, when we are finished with the data 
  // or if we have an error
  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }
    // If the cart changed & that changed property is true & only if it is true, we will dispatch & send the cart data
    // If it is false, it will not change locally & we will not send it.
    if(cart.changed) {
    dispatch(sendCartData(cart))
    }
    
  }, [cart, dispatch]);

  
  return (
    <Fragment>
        {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;