import React from "react";
import logo from '../assets/logos/logo-rogne.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HashLink as Link } from 'react-router-hash-link';
import {saveProspect} from '../api/prospect';


class Footer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null
    }
    this.email = "";
  }
  onChangeText(type, text) {
    this[type] = text;
  }
  onSubmitForm = (e)=>{
    e.preventDefault();
    let data = {
        email: this.email
    }
    console.log(data);
    saveProspect(data)
            .then((response)=>{
                console.log(response)
                if(response.status === 200) {
                   this.setState({error: response.msg})
                } else if (response.status === 500){
                  this.setState({error: response.msg})
                } else {
                  this.setState({error: 'Un problème est survenu !'})
                }
            })
    }



    render(){
  return (
    <div className="footer">    
      <div className="col1">
      <ul>
      <li><h4>Service Client</h4></li>
      <li><Link to="/#contact">Contactez-nous</Link></li>
      <li><Link to="/#contact-num">Appelez-nous dès maintenant : 0612345678</Link></li>
      <li><Link to="/#contact-rdv">Prendre rendez-vous</Link></li>
      <li><Link to="/FAQ#livraison">Personnalisation du produit</Link></li>
      <li><Link to="/FAQ#livraison">Livraison et Retours</Link></li>
      <li><Link to="/product#joaillerie">Catalogue</Link></li>
      </ul>
      </div>

      <div className="col2">
      <h4>Dernières nouveautés</h4>
      <p>Soyez les premiers informés de nos dernières créations, événements spéciaux, inaugurations de boutiques et bien plus encore en vous inscrivant par mail.</p>
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
      <button className="button" type="submit">S'inscrire <FontAwesomeIcon icon="paper-plane" /></button>
      </form>
      </div>
      <div className="social">
        <h4>Suivez-nous sur nos réseaux sociaux</h4>
        <ul className="mosaique">
        <li><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" alt="facebook"><FontAwesomeIcon icon={['fab', 'facebook-f']} style={{ color: '#3B5998' }} className="facebook"/></a></li>
        <li><a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" alt="twitter"><FontAwesomeIcon icon={['fab', 'twitter']} style={{ color: '#55ACEE' }} className="twitter"/></a></li>
        <li><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" alt="instagram"><FontAwesomeIcon icon={['fab', 'instagram']} style={{ color: '#8A2BE2' }} className="instagram"/></a></li>
        <li><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" alt="youtube"><FontAwesomeIcon icon={['fab', 'youtube']} style={{ color: '#bb0000' }} className="youtube"/></a></li>
        </ul>
      </div>
      <div className="col3">
      <img alt="Logo" src={logo}/>
      </div>
    </div>
  );
}
}

export default Footer;