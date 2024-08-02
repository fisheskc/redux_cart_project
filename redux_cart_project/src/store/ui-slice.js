import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
    name: 'ui',
    // We manage the notification here, that we are showing with the help of Redux
    initialState: { cartIsVisible: false, notification: null },
    // A map of methods that represent all the different cases, the different actions you want to handle with reducer
    reducers: {
        toggle(state) {
            // Redux Toolkit will capture this code & use another third party library imur to ensure that this is 
            // actually translated to some immutable code
            state.cartIsVisible = !state.cartIsVisible
        },
        showNotification(state, action) {
        // We have action payload. The notification should be encoded in the action as a payload.
        // eg. - pending error & success
        state.notification = {
            status: action.payload.status,
            title: action.payload.title,
            message: action.payload.message
        }
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice