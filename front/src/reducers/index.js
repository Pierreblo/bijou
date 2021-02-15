import { combineReducers } from "redux";
import UserReducer from './userReducer';
import ProductReducer from './productReducer';
import BasketReducer from './basketReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    bijoux: ProductReducer,
    basket: BasketReducer
})

export default rootReducer;