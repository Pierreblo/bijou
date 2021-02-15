import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeBasketItems} from '../../actions/basket/basketAction'
import {saveOrder} from '../../api/order';
import CheckoutForm from '../../components/checkout-form'
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';


class Payment extends React.Component {
    constructor(props) {
        super(props);
    }
    
    InjectedCheckoutForm = ()=>{
		return (
			<ElementsConsumer>
			    {({stripe, elements}) => (
			      <CheckoutForm orderId={this.props.match.params.orderId} stripe={stripe} elements={elements} />
			    )}
			</ElementsConsumer>

		)
	}
    
    render(){
        const stripePromise = loadStripe('pk_test_lX9nV9J3Smc5ybLDLim9bpx2');
        return (
            <div className="page"> 
                <h1>Paiement</h1>
                <Elements stripe={stripePromise}>
				    {this.InjectedCheckoutForm()}
				</Elements>
            </div>
        )
    }
}

const mapDispatchToProps = {
    removeBasketItems
}

const mapStateToProps = (store)=>{
    return {
        user: store.user,
        cart: store.basket
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Payment)