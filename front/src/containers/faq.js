import React from 'react';
import faqCover from '../assets/logos/faq-cover.png';



class Faq extends React.Component {

    render(){
        console.log(this.props.user);
        return (
            <div className="page">
            <div className="container">
            <img src={faqCover} className="faq-cover" alt="faq-cover"/>
            <div className="faq-text">
            <h2>Foire aux questions</h2>
            <p>Les matériaux précieux utilisés dans les créations Bijou nécessitent un entretien particulier. Suivez nos conseils pour permettre à vos bijoux de conserver tout leur éclat. </p>
            </div>
            </div>
            <h3 id="livraison">Comment se déroule la livraison?</h3>
            <h4>Délais de livraison et frais de port</h4>
            <p>Nous offrons la livraison gratuite pour toutes vos commandes. Comptez 8 jours ouvrés pour recevoir votre commande. Ce délai pourra être plus long pour les articles faisant l’objet d’une commande spéciale. Pour connaître l'état de votre commande et de la livraison, contactez le Service Client au numéro gratuit 0800 001 002 (de 10h00 à 19h00 du lundi au samedi, à l’exception des jours fériés). Comptez 5 jours ouvrés supplémentaires pour la livraison d’articles avec gravure.</p>
            <h4>Retours & Conditionnement</h4>
            <p>Pour retourner ou échanger votre article, veuillez suivre les instructions contenues dans l’emballage. Veuillez noter que Bijou n'accepte pas les échanges et n'accorde aucun remboursement sur les articles gravés ou personnalisés. </p>
            <h3>Comment s'effectuent les retours et les échanges?</h3>
            <p>Bijou vous offre l’envoi de tout produit que vous souhaiteriez retourner. Les remboursements seront traités dans les 10 jours ouvrables suivant le retour. Les articles sont échangés ou remboursés s'ils sont renvoyés à notre centre de distribution en bon état et dans les 30 jours suivant la date d’achat. Ils doivent être accompagnés du bordereau de retour. Suivez les instructions fournies avec votre colis.</p>
            <h3 id="custom">Comment faire graver un article Bijou ?</h3>
            <p>Bijou grave certains articles en métaux précieux. Les articles sont gravés dans notre police Bijou standard, mais vous avez aussi la possibilité de personnaliser la gravure. Pour de plus amples informations sur nos services de gravure, contactez le Service Client au numéro gratuit 0800 001 002. Nos représentants sont à votre disposition du lundi au vendredi de 10h00 - 19h00; fermé les jours fériés.</p>
            </div>        
);
}
}
          
export default Faq;