import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./userSlice"
import feedSlice from "./feedSlice"
import connectionSlice from "./connectionSlice"

const appStore = configureStore({
    reducer:{
        user: userSlice,
        feed : feedSlice,
        connectionData : connectionSlice,
    }
})

export default appStore