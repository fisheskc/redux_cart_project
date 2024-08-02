import { configureStore } from '@reduxjs/toolkit'

import uiSlice from './ui-slice'
import cartSlice from './cart-slice'

const store = configureStore({
    // we setup our root reducer here. Reducer created by UI Slice
    reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer }
})

export default store;