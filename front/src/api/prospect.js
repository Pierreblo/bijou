import axios from 'axios';
import {config} from '../config';

export const saveProspect = (data)=>{
    return axios.post(config.api_url+'/api/v1/prospect/save', data)
            .then((res)=>{
               return res.data 
            })
            .catch((err)=>{
                return err
            })
}