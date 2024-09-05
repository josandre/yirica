import {combineReducers} from 'redux'
import productReducer from "./products";
import {cartReducer} from "./cart";

const rootReducer = combineReducers({
    data: productReducer,
    cartList: cartReducer,
});

export default rootReducer;