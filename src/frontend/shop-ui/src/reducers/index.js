import { combineReducers } from "redux";
import { getAllProducts } from "./productReducer";

const allReducers = combineReducers({ getAllProducts });

export default allReducers;
