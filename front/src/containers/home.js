/* eslint-disable no-useless-constructor */
import React from 'react';
import home from '../assets/logos/home-header.png';
import customer from '../assets/logos/customer-cadeau.jpg';
import logo1 from '../assets/logos/logo1.png';
import logo2 from '../assets/logos/logo2.png';
import logo3 from '../assets/logos/logo3.png';
import logo4 from '../assets/logos/logo4.png';
import {connect} from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';

class Home extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.user);
        return (
            <div className="page">
                <div className="container">     
                 <img src={home} className="Home-header" alt="Home-header"/>
                     <div className="home-text">
                     <h1 id="contact">Bijou® à votre service</h1> 
	                 <p>Les experts de notre service client Bijou prennent en compte chacune de vos questions ou demandes. Nous restons à votre entière disposition pour toute requête, qu'il s'agisse du choix d'une bague de fiançailles ou d'un cadeau, d'une prise de rendez-vous pour une consultation privée ou de l'entretien et de la réparation de vos bijoux et autres créations.</p>
                     </div>
               </div>
                    <h3 id="contact-num">Contactez-nous</h3>
                    <p>bijou@gmail.com</p>
                    <p>Appelez-nous: 0612 345 678</p>
                    <p> Consultez un expert</p>
                    <h3>Horaires d'ouverture :</h3>
                    <p>Lundi – Vendredi 10h –19h </p>
               <div className="rdv">
                   <h3 id="contact-rdv"> Prenez rendez-vous</h3>
                   <p>Vous aimeriez trouver le cadeau idéal, vous préparez un évènement à fêter ou vous recherchez des conseils de style pour porter vos bijoux ? Prenez rendez-vous gratuitement, nous nous ferons un plaisir de vous aider.</p> 
                </div>
                <img src={customer} className="customer-cadeau" alt="customer-cadeau"/> 
                <section className="main">            
                   <h3>L'expérience Bijou</h3>
                   <div className="list">
                   <img src={logo1} id="Logo1" alt="Logo1"/>
                        <h4>Livraison & retours gratuits</h4>
                        <p>Nous offrons la livraison standard et les retours gratuits sur toutes les commandes Bijou</p>
                        <Link to="/faq#livraison" className="underline">En savoir plus</Link>
                   </div>
                   <div className="list">
                   <img src={logo2} id="Logo2" alt="Logo2"/>
                        <h4>Personnalisation</h4>
                        <p>De la gravure manuelle à la gravure sur verre, imposez votre style sur une création Bijou</p>
                        <Link to="/faq#livraison" className="underline">Découvrir</Link>
                   </div>
                   <div className="list">
                   <img src={logo3} id="Logo3" alt="Logo3"/>
                        <h4>Consultation au sujet d'un cadeau</h4>
                        <p>Des bijoux traditionnels aux objets décoratifs empreints de fantaisie, nous vous aiderons à trouver le cadeau idéal.</p>
                        <Link to="/#contact" className="underline">Prendre rendez-vous</Link>
                   </div>
                   <div  className="list">
                   <img src={logo4} id="Logo4" alt="Logo4"/>
                        <h4>L'emblématique boite bleue</h4>
                        <p>Votre achat Bijou est toujours soigneusement emballé dans notre emblématique boite bleue</p>
                        <Link to="/product#catalogue" className="underline">Parcourir tous les cadeaux</Link>
                   </div>
                   </section> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);