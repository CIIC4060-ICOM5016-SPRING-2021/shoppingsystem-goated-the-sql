import { combineReducers } from "redux";
import { getAllProducts } from "./productReducer";

const allReducers = combineReducers({ reducer: getAllProducts.reducer });

export default allReducers;
