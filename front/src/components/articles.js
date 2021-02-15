import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {config} from '../config'
import {connect} from 'react-redux'
import {addBasketItems} from '../actions/basket/basketAction'

class Article extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quantity: "1"
        }
    }
    render(){
        return(
          <li className="product-mosaic">
                <Link to={'detail/'+this.props.bijou.id+'#ancre-detail'}>
                <img className="product-img" alt="product-img" src={config.pict_url+this.props.bijou.url}/>
                    <p>{this.props.bijou.name.substr(0, 20)}...</p>
                    <p>{this.props.bijou.description.substr(0, 50)} ...</p>
                </Link>
                <form>
                    <input
                        type="number"
                        value={this.state.quantity}
                        min="1"
                        max={this.props.bijou.quantity}
                        onChange={(e)=>{
                            this.setState({quantity: e.currentTarget.value})
                        }}
                    />
                    <div
                        className="addToBasket"
                        onClick={(e)=>{
                            e.preventDefault();
                            if(this.state.quantity <= this.props.bijou.quantity) {
                                this.props.addBasketItems(this.props.cart.basket, this.props.bijou, parseInt(this.state.quantity))
                                this.props.addBijouBasketShowPopUp('Vous avez ajouté '+this.state.quantity+' '+this.props.bijou.name+' dans votre panier');
                                this.setState({quantity: "1"});
                            } else {
                                 this.props.addBijouBasketShowPopUp('Il ne reste que '+this.props.bijou.quantity+' '+this.props.bijou.name+' en stock !');
                            }
                        }}
                    >
                        <p className="price">{this.props.bijou.price} €</p>
                        <p className="bouton-achat">Ajouter au panier</p>
                    </div>
                </form>
          </li>
        )
    }
}

const mapStateToProps = (store)=>{
    return {
        cart: store.basket
    }
}

const mapDispatchToProps = {
    addBasketItems
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);