import React from 'react';
import {Link} from 'react-router-dom';
import {cleanBasket} from "../../actions/basket/basketAction"
import {connect} from 'react-redux';

class Success extends React.Component {
    
    componentDidMount(){
        window.localStorage.removeItem('bijou-basket');
       this.props.cleanBasket()
    }
    
    render(){            
        return (
            <div className="page">
                <p>La commande a été effectué avec succès</p>
                <Link to="/">Retour</Link>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
  return {
  	cart: store.basket,
  }
}
const mapDispatchToProps = {
	cleanBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);