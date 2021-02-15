import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logos/logo.png';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends React.Component {
    render(){
        return (
            <div className="header-nav">
			    <img src={logo} alt="logo"/>
				<ul className="nav-barre">
				    <li><Link to="/basket">Panier <FontAwesomeIcon icon="shopping-basket" /></Link></li>
					<li>{this.props.user.isLogged && <Link to="/logout">Se déconnecter <FontAwesomeIcon icon="power-off" /></Link>}</li>
					<li>{this.props.user.isLogged && <Link to="/profil">{this.props.user.infos.firstName} <FontAwesomeIcon icon="address-card"/></Link>}</li>
					<li>{!this.props.user.isLogged && <Link to="/login">Se connecter <FontAwesomeIcon icon="sign-in-alt" /></Link>}</li>
					<li>{!this.props.user.isLogged && <Link to="/register">S'enregistrer <FontAwesomeIcon icon="user-plus" /></Link>}</li>
					<li>{this.props.user.isLogged && this.props.user.infos.role === "admin" && <Link to="/admin">Administration <FontAwesomeIcon icon="tools" /></Link>}</li>
					<li><Link to="/faq">F.A.Q <FontAwesomeIcon icon="book" /></Link></li>
					<li><Link to="/product">Produits <FontAwesomeIcon icon="gem" /></Link></li>
					<li><Link to="/">Accueil <FontAwesomeIcon icon="home" /></Link></li>
                </ul>
			</div>
            )
    }
}

const mapDispatchToProps = {
    
}

const mapStateToProps = (store)=>{
    return {
        user: store.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);