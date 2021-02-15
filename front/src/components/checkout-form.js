import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import axios from "axios";
import {config} from '../config';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {getTokenPaiement, validatePayment} from '../api/order';
import {modifyQuantityProduct} from '../api/product';

class CheckoutForm extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        redirect: false
      }
    }
    
    handleSubmit = async (e)=>{
      e.preventDefault()
      let orderId = this.props.orderId;
      let data = {
        orderId: orderId,
        email: this.props.user.infos.email
      }
      let paymentIntent = await getTokenPaiement(data);
      console.log(paymentIntent);
      const token_secret = paymentIntent.client_secret;
      const payment = await this.props.stripe.confirmCardPayment(token_secret, {
                                                                      payment_method: {
                                                                        card: this.props.elements.getElement(CardElement),
                                                                        billing_details: {
                                                                          email: this.props.user.infos.email
                                                                        },
                                                                      }
                                                                  })
      console.log(payment);
      if(payment.error) {
        console.log('c\'est mort', payment.error.message)
      } else {
        if (payment.paymentIntent.status === 'succeeded') {
          console.log('Money is in the bank!');
          let data = {
            orderId: this.props.orderId,
            status: "payed"
          }
          validatePayment(data)
            .then((res)=>{
              console.log(res);
              
              this.props.cart.basket.map((bijou)=>{
                let data ={
                  quantity: bijou.quantityInCart
                }
                
                modifyQuantityProduct(bijou.id, data)
                  .then((res)=>{
                    console.log(res);
                    this.setState({redirect: true})
                  })
              })
            })
        }
      }
    }
    
    render() {
        if(this.state.redirect) {
          return <Redirect to="/success" />
        }
        const {stripe} = this.props;
        console.log(stripe);
        return (
          <form onSubmit={this.handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe}>
              Pay
            </button>
          </form>
        );
      }

}



const mapStateToProps = (store) => {
  return {
  	user: store.user,
  	cart: store.basket
  }
}
const mapDispatchToProps = {
	
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);