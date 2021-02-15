import axios from 'axios';
import {config} from '../config';
const token = window.localStorage.getItem('bijou-token');

export const saveUser = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/save', data)
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}
export const loginUser = (data)=> {
    return axios.post(config.api_url+'/api/v1/user/login', data)
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}
export const modifyUser = (data)=> {
    return axios.post(config.api_url+'/api/v1/user/update', data, {headers: {'x-access-token': token}} )
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}
export const forgotPassword = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/forgot', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}