/* eslint-disable import/no-anonymous-default-export */
import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {config} from '../config';
import axios from 'axios';
import {connect} from 'react-redux';
import {loadUserInfo} from '../actions/user/userAction';
import {loadAllProducts} from '../actions/product/productAction';
import {loadProductFromApi} from "../api/product";

export default function(ChildComponent, withAuth=false){
	const RequireAuth = (props)=>{
		const [redirect, setRedirect] = useState(false);
		useEffect(()=>{
			if(props.product.bijoux.length === 0) {
				loadProductFromApi()
				.then((response)=>{
					console.log(response);
					if(response.status === 200) {
						props.loadAllProducts(response.products);
					}
				})
			}
		    console.log(props.user)
		    const token = window.localStorage.getItem('bijou-token');
		    if(token === null && withAuth) {
		        setRedirect(true);
		    } else {
		        if(props.user.isLogged === false) {
		            axios.get(config.api_url+'/api/v1/checkToken', {headers: {'x-access-token': token}})
    		        .then((response)=>{
    		            if(response.data.status !== 200) {
    		                if(withAuth === true) {
    		                    setRedirect(true)
    		                }
    		            } else {
    		                console.log('connecté !');
                            props.loadUserInfo(response.data.user[0]) 
    		            }
    		        })
		        }
		    }
		    
		}, [props])
		if(redirect) {
            return <Redirect to="/login" />
        }
        return (<ChildComponent {...props} />)
	}
	const mapStateToProps = (store)=>{
        return {
            user: store.user,
            product: store.bijoux
        }
    }
	const mapDispatchToProps = {
	    loadUserInfo,
        loadAllProducts
	}
    return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}