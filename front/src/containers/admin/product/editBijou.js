import React from 'react';
import {saveProduct, savePicture} from '../../../api/product';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {editProduct, deletePict} from '../../../api/product';
import {loadAllProducts} from '../../../actions/product/productAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class EditBijou extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            error: null,
            redirect: false,
            
        }
        
        this.name = "";
        this.description = "";
        this.quantity = "";
        this.price = "";
       
    }
    
    onChangeText(type, text) {
        this[type] = text
        console.log(this[type]);
    }
    
    
  
    onSubmitForm = (e)=>{
        e.preventDefault();
        let id = this.props.match.params.id;
        let index = this.props.product.bijoux.findIndex((bijou)=>{return bijou.id === parseInt(id)})
            
        let data = {
            name: this.name,
            description: this.description,
            quantity: this.quantity,
            price: parseFloat(this.price)
        }
        console.log(data);
        
        if(this.state.selectedFile === null) {
            data.url = this.props.product.bijoux[index].url
            
            editProduct(data, id)
                .then((response)=>{
                    console.log(response);
                     if (response)  {
                         this.props.loadAllProducts(response.products);
                        this.setState({redirect: true})
                    }
                })
            
        } else {
            savePicture(this.state.selectedFile)
                .then((response)=>{
                    console.log(response);
                     data.url = response.url
                     editProduct(data, id)
                    .then((res)=>{
                        console.log(res);
                        deletePict(this.props.product.bijoux[index].url)
                        .then((result)=>{
                            console.log(result);
                            if (res.status === 200)  {
                                this.props.loadAllProducts(res.products);
                                this.setState({redirect: true})
                            }
                        })
                    })
                })
        }
    }
    
    render(){
        let id = this.props.match.params.id;

        if(this.props.product.bijoux.length > 0) {
            let index = this.props.product.bijoux.findIndex((bijou)=>{return bijou.id === parseInt(id)})
            if (index === -1) {
                return <Redirect to="/admin" />
            }
            this.name = this.props.product.bijoux[index].name;
            this.description = this.props.product.bijoux[index].description;
            this.quantity = this.props.product.bijoux[index].quantity;
            this.price = this.props.product.bijoux[index].price;
            console.log(index);
        }
        return (
            <div className="page">
                {this.state.redirect && <Redirect to="/admin" />}
                <h3>Modification de : {this.name}</h3>
                {this.state.error !== null && <p>{this.state.error}</p>}
                {this.props.product.bijoux.length > 0 && <form 
                    className="formulaire"
                    onSubmit={this.onSubmitForm}
                >
                    <input
                        type="text"
                        placeholder="Nom du produit"
                        defaultValue={this.name}
                        onChange={(e)=>{
                            this.onChangeText('name', e.currentTarget.value)
                        }}
                    />
                    <input
                        type="file"
                        onChange={(e)=>{
                            this.setState({selectedFile: e.currentTarget.files[0]})
                        }}
                    />
                    <textarea
                        type="text"
                        defaultValue={this.description}
                        onChange={(e)=>{
                            this.onChangeText('description', e.currentTarget.value)
                        }}
                    >
                    </textarea>
                    <input
                        type="text"
                        defaultValue={this.quantity}
                        placeholder="Quantité"
                        onChange={(e)=>{
                            this.onChangeText('quantity', e.currentTarget.value)
                        }}
                    />
                    <input
                        type="text"
                        defaultValue={this.price}
                        placeholder="Prix de vente"
                        onChange={(e)=>{
                            this.onChangeText('price', e.currentTarget.value)
                        }}
                    />
                    <button className="button" type="submit">Enregister <FontAwesomeIcon icon="save" /></button>
                </form>}
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadAllProducts
}

const mapStateToProps = (store)=>{
    return {
        product: store.bijoux
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBijou)