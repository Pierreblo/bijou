import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {removeBasketItems} from '../../actions/basket/basketAction'
import {saveOrder} from '../../api/order';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	redirect: false,
        	orderId: null
        }
    }
    
    onClickSaveOrder = ()=>{
    	let data = {
    		user_id: this.props.user.infos.id,
    		basket: this.props.cart.basket
    	}
    	
    	console.log(data);
    	
    	saveOrder(data)
    		.then((res)=>{
    			console.log(res);
    			if(res.status === 200) {
    				
    				this.setState({redirect: true, orderId: res.orderId});
    			}
    		})
    }
    
    render(){
        return (
			<div className="page"> 
                <h2 id='ancre-panier'>Panier</h2>
                 {this.state.redirect && <Redirect to={"/payment/"+this.state.orderId} />}
                <div id="displayBasket">
                {this.props.cart.basket.length > 0 ? <table className="basketTable">
                    <thead>
						<tr>
						    <th>Nom</th>
							<th>Quantité</th>
							<th className="desktop">Prix </th>
							<th>Prix*Quantité</th>
							<th>Action</th>
						</tr>
					</thead>
					<tfoot>
							<tr>
							    <td></td>
								<td></td>
								<td className="bold">Prix Total</td>
								<td><span id="totalPrice">{this.props.cart.totalPrice.toFixed(2)}</span> €</td>
								<td>{this.props.user.isLogged && <button className="check-out"
                	onClick={(e)=>{
                		e.preventDefault();
                		this.onClickSaveOrder();
                	}}
                >
                	Paiement <FontAwesomeIcon icon="credit-card" />
                </button>}</td>
							</tr>
						</tfoot>
					<tbody>
					    {this.props.cart.basket.map((bijou, index)=>{
					        let total = parseFloat(bijou.price) * parseInt(bijou.quantityInCart);
					        return (
					            <tr key={index}>
								    <td>{bijou.name}</td>
					                <td>{bijou.quantityInCart}</td>
					                <td>{bijou.price} €</td>
					                <td>{total.toFixed(2)} €</td>
					                <td>
					                    <button
					                        className="trash-bijou"
					                        onClick={(e)=>{
					                            e.preventDefault();
					                            this.props.removeBasketItems(this.props.cart.basket, bijou)
					                        }}
					                    >
					                        <FontAwesomeIcon icon="trash-alt" />
					                    </button>
					                </td>
					            </tr>
					        )
					    })}
					</tbody>
                </table> :
                <p className="basket-banner">Mon panier est vide</p>}
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Basket);