import { createSlice } from '@reduxjs/toolkit';

// removeItemFromCart & addItemToCart are only executed from our local application. When we fetch data from Firebase,
// where we then exceute replaceCart, this will not change. "changed" will stay false, in cartSlice.
const cartSlice = createSlice({
   name: 'cart',
   initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    // This change property is also part of fireBase, because we are sending the overall cart state, as it is stored by Redux.
    changed: false
   },
   reducers: {
    // We should extract the item from the action & that
    // this would be the payload property which Redux Toolkit sets for you.
    // We need to check if this is part of that array already & if it is, increase the quantity of the existing cart item instead
    // of pushing it as an additional item.
    // We want to get the existing item by using the state items & finding an item in there, where the item ID is equal to the newItem.id
    // This gets the new totalQuantity & the new items from the payload & overrides it in the Redux store
    replaceCart(state,action) {
        state.totalQuantity = action.payload.totalQuantity;
        // The payload which you dispatch is an object with a total quantity & an items key. This is created in productItems
        state.items = action.payload.items;
    },
    addItemToCart(state, action) {
        const newItem = action.payload;  
        const existingItem = state.items.find(item => item.id === newItem.id)
        // if it does not exist, we add it
        // push manipulates the existing array, in the existing state & that is a MUST NOT DO with just Redux.
        // With Redux Toolkit, you do not have that problem, as you do not manipulate the existing state.
        // It updates the state in an immutable way & we push a new object with an item ID.
        // We push a new item onto our products array
        state.totalQuantity++;
        state.changed = true;
        if(!existingItem) {
            state.items.push({
                id: newItem.id,
                price: newItem.price,
                quantity: 1,
                // We get an exitsing item by comparing the id of the stored item to the newItem.id
                // Are we storing the item.id in itemId: newItem.id field?
                // That should be changed to id: newItem.id, so when we extract the id, we are successful
                // If we add the same item multiple times, it is grouped together
                totalPrice: newItem.price,
                name: newItem.title
            })
        } else {
            existingItem.quantity++
            existingItem.totalPrice = existingItem.totalPrice + newItem.price
        }
    },
    // We will get some extra payload that helps us identify the item that should be removed
    removeItemFromCart(state, action) {
        const id = action.payload
        // We need to find out how many items are in the array & remove them
        const existingItem = state.items.find(item => item.id === id);
        // If we have that item in the cart once or multiple times, you might need to reduce the totalQuantity by 1 in the cart
        state.totalQuantity--;
        state.changed = true;
        if(existingItem.quantity === 1) {
            // if the quantity is 1, remove it from the array
            // This overwrites the array of items with a new array & the removed item is missing
            state.items = state.items.filter(item => item.id !== id)
        } else {
            existingItem.quantity--
            // When we remove an item from the cart & the item is still part of the cart, the quantity was not 1,
            // then just updating the quantity is not enough. We update the total price of that item
            // To reduce the total price by the price of a single item, as we are removing a single item.
            existingItem.totalPrice = existingItem.totalPrice - existingItem.price
        }
    },
   } 
})

export const cartActions = cartSlice.actions

export default cartSlice;