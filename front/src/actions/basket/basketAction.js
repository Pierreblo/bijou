import {SAVE_BASKET, CLEAN_BASKET} from './actions-type';

export const addBasketItems = (basket, product, quantityInCart)=>{
    let index = basket.findIndex((bijou)=>{
        return bijou.id === product.id
    })    
    if(index === -1) {
        product.quantityInCart = quantityInCart
        basket.push(product)
    } else {
        basket[index].quantityInCart += quantityInCart
    }
    return function(dispatch) {
        dispatch({
            type: SAVE_BASKET,
            payload: basket
        })
    }
}

export const removeBasketItems = (basket, product)=>{   
    let newBasket = basket.filter((bijou)=>{
        return bijou.id !== product.id
    })
    return function(dispatch) {
        dispatch({
            type: SAVE_BASKET,
            payload: newBasket
        })
    }
}

export const cleanBasket = ()=>{
    return function(dispatch) {
        dispatch({
            type: CLEAN_BASKET,
            payload: null
        })
    }
}