/* eslint-disable default-case */
import {LOAD_PRODUCT} from '../actions/product/actions-type';

const initialState = {
    bijoux: []
}

const ProductReducer = (state = initialState, action)=>{
    switch (action.type) {
        case LOAD_PRODUCT:
            return {bijoux: action.payload}
        break;
    }
    return state;
}

export default ProductReducer;