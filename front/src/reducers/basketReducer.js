/* eslint-disable default-case */
import {SAVE_BASKET, CLEAN_BASKET} from '../actions/basket/actions-type';
let basket = JSON.parse(window.localStorage.getItem('bijou-basket'));


if(basket === null) {
    basket = [];
}

let totalPrice = calculateTotalPrice(basket)

const initialState = {
    basket: basket,
    totalPrice: totalPrice
}

function calculateTotalPrice(basket) {
    let totalPrice = 0;
    for(let i = 0; i < basket.length; i++) {
        let total = parseFloat(basket[i].price) * parseInt(basket[i].quantityInCart);
        totalPrice += total;
    }
    
    return totalPrice;
}


const BasketReducer = (state = initialState, action)=>{
    switch(action.type) {
        case SAVE_BASKET:
            
            window.localStorage.setItem('bijou-basket', JSON.stringify(action.payload))
            let totalPrice = calculateTotalPrice(action.payload);
            
            return {basket: action.payload, totalPrice: totalPrice}
        break;
        
        case CLEAN_BASKET:
            return {totalAmount: 0, basket: []}
        break;
    }
    return state;
}

export default BasketReducer;