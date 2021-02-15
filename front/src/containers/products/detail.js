import React from 'react';
import {connect} from 'react-redux'
import { Redirect, HashLink as Link } from 'react-router-hash-link';
import {config} from '../../config';
import {addBasketItems} from '../../actions/basket/basketAction';
import PopUp from '../../components/popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: "1",
            isPopUp: false,
            msg: ""
        }
    }
    
    addBijouBasketShowPopUp = (newMessage)=>{
        this.setState({msg: newMessage, isPopUp: true})
    }
    
    render(){
        let id = this.props.match.params.id;
        let index = this.props.product.bijoux.findIndex((bijou) => { return bijou.id === parseInt(id)})
        let bijou = this.props.product.bijoux[index];
        
        return (
            <div className="page">
                {index === -1 && this.props.product.bijoux.length !== 0 && <Redirect to="/product" />}
                <PopUp 
                    isPopUp={this.state.isPopUp} 
                    msg={this.state.msg}
                    closePopUp={()=>{
                    this.setState({isPopUp: false})  
                    }}
                />
                <h2 id='ancre-detail'>Detail</h2>
                <Link className ="retour" to="/product#catalogue"><FontAwesomeIcon icon="arrow-circle-left" /></Link>
                {this.props.product.bijoux.length !== 0 && index !== -1 && 
                <div className="bijouDetail">
                    <img src={config.pict_url+bijou.url} className="productImage" alt="productImage"/>
                    <h3>{bijou.name}</h3>
                    <p>{bijou.description}</p>
                    <div className="bijouDetail">
                        <form>
                            <input
                                type="number"
                                value={this.state.quantity}
                                min="1"
                                max={bijou.quantity}
                                onChange={(e)=>{
                                    this.setState({quantity: e.currentTarget.value})
                                }}
                            />
                            <div
                                className="addToBasket"
                                onClick={(e)=>{
                                    e.preventDefault();
                                    if(this.state.quantity <= bijou.quantity) {
                                        this.props.addBasketItems(this.props.cart.basket, bijou, parseInt(this.state.quantity))
                                        this.addBijouBasketShowPopUp('Vous avez ajouté '+this.state.quantity+' '+bijou.name+' dans votre panier');
                                        this.setState({quantity: "1"})
                                    } else {
                                         this.addBijouBasketShowPopUp('Oups, il ne reste que '+bijou.quantity+' '+bijou.name+' en stock !');
                                    }
                                }}
                            >
                                <p className="price">{bijou.price} €</p>
                                <p className="bouton-achat">Ajouter au panier</p>
                            </div>
                        </form>
                    </div>
                </div>}
            </div>
        )
    }
}



const mapDispatchToProps = {
    addBasketItems
}

const mapStateToProps = (store)=>{
    return {
        product: store.bijoux,
        cart: store.basket
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)