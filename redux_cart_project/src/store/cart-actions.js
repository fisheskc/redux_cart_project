import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('https://reduxshop-5ec1a-default-rtdb.europe-west1.firebasedatabase.app/cart.json');
        
        if(!response.ok) {
            throw new Error('Could not fetch cart data!')
        }
        const data = await response.json()
        return data
        }
        try {
          // We use the cart data to set the cart
          const cartData = await fetchData();
          // We pass cart data as a payload. We should make sure that the payload we pass
          // to replaceCart, is an object which always has an items key, which is either cartData.items or an empty array
          // We ensure that we never have items being undefined. The price updates correctly
          dispatch(cartActions.replaceCart({
            items: cartData.items || [],
            totalQuantity: cartData.totalQuantity
          }))
            // catch any errors here, eg show error notification you might get
        } catch(error) {
            dispatch(uiActions.showNotification({
                // currently sending the request
                status: 'error',
                title: 'Error!',
                sending: 'Fetching cart data failed!'
            }))
        } 
    }
    
  }


// An action creator function
export const sendCartData = (cart) => {
    // returns an action object
    // Redux toolkit, creates these action creators automatically for us, for all the reducer methods
    // A function that should receive the dispatch function, as an argument
    return async (dispatch) => {
      // Inside of this function we can dispatch the actual action we want to perform. eg. showing a nofication
      // before we call dispatch, we can perform any asynchronous code, any side effect, because we have not yet reached our reducer.
      // This is a common pattern - dispatch, we want to have action creators, that can perform side effects & then dispatch other actions
      // which eventually reach the reducers.
      dispatch(uiActions.showNotification({
            // currently sending the request
            status: 'pending',
            title: 'Sending...!',
            sending: 'Sending cart data!'
          }))

          // This extra nesting is required because of how the fetch API works.
          // Where we send our cart data, instead of taking the whole cart, we can create a new object, where we use items from cartItems.
          // We create the new object, which does not contain changed & it is no longer part of fireBase
          const sendRequest = async() => {
            const response = await fetch('https://reduxshop-5ec1a-default-rtdb.europe-west1.firebasedatabase.app/cart.json', { 
                method: 'PUT',
                // The cart is converted to JSON data & sent as part of the 'PUT' request we are sending as the 
                // snapshots to fireBase
                body: JSON.stringify({ items: cart.items, totalQuantity: cart.totalQuantity })
              });
          
              if(!response.ok) {
                throw new Error('Sending cart data failed.')
              }
          }

          try {
            await sendRequest()
            // Dispatch success first
            dispatch(uiActions.showNotification({
                // currently sending the request
                status: 'success',
                title: 'Success!',
                sending: 'Sent cart data successfully!'        
              }))
            // Dispatch the error & notifcation
          } catch (error) {
            dispatch(uiActions.showNotification({
                // currently sending the request
                status: 'error',
                title: 'Error!',
                sending: 'Sending cart data failed!'
              }))
          }
    }
}