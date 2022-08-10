import {combineReducers, configureStore} from "@reduxjs/toolkit";

//Reducers
import cartReducer from "./features/cart/cartSlice";
import productReducer from "./features/products/productSlice";
import userReducer from "./features/user/accountSlice";
import statsReducer from "./features/statistics/statsSlice";
import likesReducer from "./features/likes/likesSlice";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  stats: statsReducer,
  likes: likesReducer,
  cart: cartReducer
});

export const reduxStorage = configureStore({
  reducer: rootReducer
});
