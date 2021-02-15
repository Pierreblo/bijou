import {LOAD_PRODUCT} from './actions-type';
console.log("LOAD_PRODUCT", LOAD_PRODUCT)

export const loadAllProducts = (products)=>{
     return function(dispatch) {
        dispatch({
            type: LOAD_PRODUCT,
            payload: products
        })
    }
}