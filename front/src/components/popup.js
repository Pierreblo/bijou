import React from 'react';
import Box from "../assets/logos/blue-box.jpg";
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Popup extends React.Component {
    render() {
        return (<div>
            {this.props.isPopUp && <div className="blocNoir">
            <div className="popUp">
                <p className="popUp-msg">{this.props.msg}</p>
                <img src={Box} alt="popup-addBasket"/> 
                <div className="bouton-align">
                <button className="button" onClick={this.props.closePopUp}> 
                <p>Continuer ma visite</p><FontAwesomeIcon icon="arrow-circle-left" />
                </button>
                <Link to="/basket#ancre-panier"><button className="button" ><p>Voir mon panier</p><FontAwesomeIcon icon="arrow-circle-right" /></button></Link>
                </div>
            </div>
            </div>}
        </div>)
    }
}

export default Popup;