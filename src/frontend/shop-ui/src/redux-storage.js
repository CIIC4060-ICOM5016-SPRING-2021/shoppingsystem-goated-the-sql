import { configureStore } from "@reduxjs/toolkit";

//Reducers
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import userReducer from "./features/user/accountSlice";
import statsReducer from "./features/statistics/statsSlice";
import accountSlice from "./features/user/accountSlice";
import wishlistReducer from "./features/wishlist/likesSlice";

export const reduxStorage = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
    stats: statsReducer,
    account: accountSlice,
    likes: wishlistReducer,
    cart: cartReducer,
  }
});
