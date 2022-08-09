import { configureStore } from "@reduxjs/toolkit";

//Reducers
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import userReducer from "./features/user/userSlice";
import statsReducer from "./features/statistics/statsSlice";

export const reduxStorage = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    user: userReducer,
    stats: statsReducer,
  }
});
