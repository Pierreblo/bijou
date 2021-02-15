import React from 'react';
import {Redirect} from 'react-router-dom';
import {loginUser} from '../../api/user';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            error: null
        }
        this.email = "";
        this.password = "";
    }
    
    onChangeText(type, text) {
        this[type] = text;
    }
    
    onSubmitForm = (e)=>{
        e.preventDefault();
        let data = {
            email: this.email,
            password: this.password
        }
        console.log(data);
        loginUser(data)
        .then((res)=>{
            console.log(res);
            if(res.status === 200) {
                window.localStorage.setItem('bijou-token', res.token);
                this.setState({redirect:true})
            } else if (res.status === 401){
               this.setState({error: res.msg})
            }  else if (res.status === 403){
                this.setState({error: res.msg})
             } else if (res.status === 404) {
                this.setState({error: res.msg})
            } else {
                this.setState({error: 'Un problème est survenu !'})
            }
        })
    }
    
    render() {
        return (
            <div className="page">
                <h3>Créer un compte</h3>
                <p>Gagnez du temps au moment du paiement, consultez votre panier et les articles enregistrés depuis n’importe quel appareil et accédez à l’historique de vos commandes.</p>
                <p>Vous n'avez pas encore de compte ? <Link to="/register" className="underline">M'inscrire <FontAwesomeIcon icon="angle-double-right" /></Link></p>
                <h3>Se connecter à un compte</h3>
                {this.state.redirect && <Redirect to="/" />}
                {this.state.error !== null && <p className="errorMsg">{this.state.error}</p>}
                <form 
                    className="formulaire"
                    onSubmit={(e)=>{
                        this.onSubmitForm(e)
                    }}
                >
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
                    <button className="button" type="submit">Connexion <FontAwesomeIcon icon="angle-double-right" /></button>
                </form>
                <div>
					<p><Link to="/forgot" className="underline">Mot de passe oublié ? </Link></p>
				</div>
            </div>
        )
    }
}

export default Login;