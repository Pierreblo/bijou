import axios from 'axios';
import {config} from '../config';

const token = window.localStorage.getItem('bijou-token');

export const saveProduct = (data)=>{
    return axios.post(config.api_url+'/api/v1/product/save', data, {headers: {'x-access-token': token}})
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}

export const savePicture = (file)=>{
    let formData = new FormData();
    formData.append('image', file);
    console.log('file',file);
    return axios({
        method: "post",
        url: config.api_url+'/api/v1/product/pict',
        data: formData,
        headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-access-token": token
                }
    })
    .then((response)=>{
        return response.data;
    })
    .catch((err)=>{
       console.log(err);
       return err;
    })
}

export const loadProductFromApi = ()=>{
    return axios.get(config.api_url+'/api/v1/product/all')
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}

export const editProduct = (data, id)=>{
     return axios.put(config.api_url+'/api/v1/product/modify/'+id, data, {headers: {'x-access-token': token}})
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}


export const deletePict = (name)=>{
     return axios.delete(config.api_url+'/api/v1/product/deletePict/'+name,{headers: {'x-access-token': token}})
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}


export const deleteProduct = (id)=>{
     return axios.delete(config.api_url+'/api/v1/product/delete/'+id,{headers: {'x-access-token': token}})
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}

export const modifyQuantityProduct  = (id, data)=>{
     return axios.put(config.api_url+'/api/v1/product/updatequantity/'+id, data ,{headers: {'x-access-token': token}})
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}