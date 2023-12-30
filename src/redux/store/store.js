import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/authSlice";
import cartSlice from "../feature/cartSlice";
import courseSlice from "../feature/courseSlice";
import courseCreationSlice from "../feature/courseCreationSlice";


const store = configureStore({
    reducer:{
        auth: authSlice,
        cart: cartSlice,
        course: courseSlice,
        courseCreation:courseCreationSlice
    }
});

export default store;
