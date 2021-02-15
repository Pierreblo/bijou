import React from 'react';
import {saveUser} from '../../api/user';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            error: null
        }
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.address = "";
        this.city = "";
        this.zip = "";
        this.phone = "";
    }
    
    onChangeText(type, text) {
        this[type] = text;
    }
    
    onSubmitForm = (e)=>{
        e.preventDefault();
        let data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            address: this.address,
            city: this.city,
            zip: this.zip,
            phone: this.phone
        }
        console.log(data);
        saveUser(data)
            .then((response)=>{
                console.log(response)
                if(response.status === 200) {
                    this.setState({redirect: true})
                } else {
                    this.setState({error: 'un problème s\'est produit durant l\'utilisateur !'})
                }
            })
    }
    
    render() {
        return (
            <div className="page">
                <h3>Se connecter à un compte</h3>
                <p>Le compte Bijou.com vous permet de gagner du temps au moment du paiement, d'accéder à votre panier de n'importe quel appareil et de consulter l'historique de vos commandes.</p>
                <p>Vous avez déjà un compte ?   <Link to="/login" className="underline">Me connecter <FontAwesomeIcon icon="angle-double-right" /></Link></p>
                <h3>Créer un compte</h3>
                {this.state.redirect && <Redirect to="/login" />}
                {this.state.error !== null && <p style={{color: "red"}}>{this.state.error}</p>}
                <form 
                    className="formulaire"
                    onSubmit={(e)=>{
                        this.onSubmitForm(e)
                    }}
                >
                    <input 
                        type="text"
                        placeholder="Mon prénom"
                        onChange={(e)=>{
                            this.onChangeText('firstName', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Mon nom"
                        onChange={(e)=>{
                            this.onChangeText('lastName', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Mon mail"
                        onChange={(e)=>{
                            this.onChangeText('email', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="password"
                        placeholder="Mon mot de passe"
                        onChange={(e)=>{
                            this.onChangeText('password', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Mon adresse"
                        onChange={(e)=>{
                            this.onChangeText('address', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Mon code postal"
                        onChange={(e)=>{
                            this.onChangeText('zip', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Ma ville"
                        onChange={(e)=>{
                            this.onChangeText('city', e.currentTarget.value)
                        }}
                    />
                    <input 
                        type="text"
                        placeholder="Mon numéro de téléphone"
                        onChange={(e)=>{
                            this.onChangeText('phone', e.currentTarget.value)
                        }}
                    />
                    <button className="button" type="submit">Enregister <FontAwesomeIcon icon="user-plus" /></button>
                </form>
            </div>
        )
    }
}

export default Register;