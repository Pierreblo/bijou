import {LOAD_USER_INFO, LOGOUT_USER} from './actions-type';

export const loadUserInfo = (user)=>{
    return function(dispatch) {
        dispatch({
            type: LOAD_USER_INFO,
            payload: user
        })
    }
}

export const logoutUser = ()=>{
        return function(dispatch) {
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}