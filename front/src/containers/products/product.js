import React from 'react';
import {connect} from 'react-redux'
import Article from '../../components/articles';
import PopUp from '../../components/popup';
import BijouProduct from '../../assets/logos/bijou-product.jpg';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopUp: false,
            msg: ""
        }
    }
    addBijouBasketShowPopUp = (newMessage)=>{
        this.setState({msg: newMessage, isPopUp: true})
    }
    render() {
        console.log(this.props.product)
        return (
            <div className="page">
                <PopUp 
                    isPopUp={this.state.isPopUp} 
                    msg={this.state.msg}
                    closePopUp={()=>{
                    this.setState({isPopUp: false})  
                    }}
                />
                <div className="container">
                <img src={BijouProduct} className="bijou-product" alt="bijou-product"/>
                <div className="product-text">
                <h2 id="joaillerie">Joaillerie</h2>
                <p>Nos bijoux s'appuient sur plus de 180 années de savoir-faire avec notamment des colliers et pendentifs, bracelets et bagues aux lignes magnifiques.</p>
                </div>
                </div>
                <h3 id='catalogue'>Catalogue</h3>
                {
                    this.props.product.bijoux.length > 0 && <ul className="product-ul">
                        {this.props.product.bijoux.map((bijou, index)=>{
                            return <Article key={index} bijou={bijou} addBijouBasketShowPopUp={this.addBijouBasketShowPopUp}/>
                        })}
                    </ul>
                }
            </div>
        )
    }
}

const mapDispatchToProps = {
    
}

const mapStateToProps = (store)=>{
    return {
        product: store.bijoux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)