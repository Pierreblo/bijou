import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {modifyUser} from '../../api/user';
import {loadUserInfo} from '../../actions/user/userAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Hook
const Profil = (props)=>{
    // déclaration des state
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(()=>{

    }, [])
    
    useEffect(()=>{
        
    }, [firstName, lastName])
    
    useEffect(()=>{
          if(props.user.isLogged) {
            setFirstName(props.user.infos.firstName);
            setLastName(props.user.infos.lastName);
            setAddress(props.user.infos.address);
            setCity(props.user.infos.city);
            setZip(props.user.infos.zip);
            setPhone(props.user.infos.phone);
        }
        
    }, [props])
    
    const onSubmitForm = (e)=>{
        e.preventDefault();
        let data = {
            id: props.user.infos.id,
            email: props.user.infos.email,
            firstName: firstName,
            lastName: lastName,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        modifyUser(data)
        .then((res)=>{
            console.log(res);
            if(res.status === 200) {
                props.loadUserInfo(res.user[0]);
            }
        })
    }
    
    return (
        <div className="page">
            <h3>Gérer mes informations</h3>
            {props.user.isLogged && <form
                className="formulaire"
                onSubmit={onSubmitForm}
            >
                <input 
                    type="text"
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e)=>{
                        setFirstName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e)=>{
                        setLastName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Adresse"
                    value={address}
                    onChange={(e)=>{
                        setAddress(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="code postal"
                    value={zip}
                    onChange={(e)=>{
                        setZip(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Ville"
                    value={city}
                    onChange={(e)=>{
                        setCity(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Téléphone"
                    value={phone}
                    onChange={(e)=>{
                        setPhone(e.currentTarget.value)
                    }}
                />
                <button className="button" type="submit">Enregistrer <FontAwesomeIcon icon="save" /></button>
            </form>}
        </div>
    )
}

const mapStateToProps = (store) => {
  return {
  	user: store.user
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);