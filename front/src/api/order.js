import axios from 'axios';
import {config} from '../config';

const token = window.localStorage.getItem('bijou-token');

export const saveOrder = (data)=>{
    return axios.post(config.api_url+"/api/v1/order/save", data, {headers: {'x-access-token': token}})
                .then((response)=>{
                    return response.data;
                })
                .catch((err)=>{
                    console.log(err);
                })
}

export const getTokenPaiement = (data)=>{
    return axios.post(config.api_url+"/api/v1/order/payment", data, {headers: {'x-access-token': token}})
                .then((response)=>{
                    return response.data;
                })
                .catch((err)=>{
                    console.log(err);
                })
}

export const validatePayment = (data)=>{
    return axios.post(config.api_url+"/api/v1/order/updateStatus", data, {headers: {'x-access-token': token}})
                .then((response)=>{
                    return response.data;
                })
                .catch((err)=>{
                    console.log(err);
                })
}