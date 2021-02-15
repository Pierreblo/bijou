import React from 'react';
import {saveProduct, savePicture} from '../../../api/product';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadAllProducts} from '../../../actions/product/productAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddBijou extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            error: null,
            redirect: false
        }
        this.name = "";
        this.description = "";
        this.quantity = "";
        this.price = "";
    }
    onChangeText = (type, text)=>{
        this[type] = text
    }
    onSubmitForm = (e)=>{
        e.preventDefault();
        if(this.state.selectedFile === null) {
            let data = {
                name: this.name,
                description: this.description,
                url: "no-pict.jpg",
                quantity: this.quantity,
                price: parseFloat(this.price)
            }
            saveProduct(data)
            .then((response)=>{
                console.log(response);
                if(response.status === 200) {
                    this.setState({redirect: true});
                } else {
                    this.setState({error: "Erreur enregistrement produit"});
                }
            })
        } else {
            savePicture(this.state.selectedFile)
                .then((response)=>{
                    console.log(response);
                    let data ={
                                    name: this.name,
                                    description: this.description,
                                    price: this.price,
                                    quantity: this.quantity
                                }
                    if(response.status === 200) {
                        data.url = response.url;
                    } else {
                        data.url = "no-pict.jpg";
                        this.setState({error: "Erreur enregistrement photo"});
                    }
                    saveProduct(data)
                        .then((response)=>{
                            console.log(response);
                            if(response.status === 200) {
                                this.props.loadAllProducts(response.products);
                                this.setState({redirect: true});
                            } else {
                                this.setState({error: "Erreur enregistrement produit"});
                            }
                        })
                })
        }
    }
    render(){
        return (
            <div className="page">
                <h2>Ajoutez un produit</h2>
                {this.state.redirect && <Redirect to="/admin" />}
                {this.state.error !== null && <p style={{color: "red"}}>{this.state.error}</p>}
                <form 
                    className="formulaire"
                    onSubmit={(e)=>{
                        this.onSubmitForm(e)
                    }}
                >
                    <input
                        type="text"
                        placeholder="Nom du produit"
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
                        placeholder="Description"
                        onChange={(e)=>{
                            this.onChangeText('description', e.currentTarget.value)
                        }}
                    >
                    </textarea>
                    <input
                        type="text"
                        placeholder="Quantité"
                        onChange={(e)=>{
                            this.onChangeText('quantity', e.currentTarget.value)
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Prix de vente"
                        onChange={(e)=>{
                            this.onChangeText('price', e.currentTarget.value)
                        }}
                    />
                    <button className="button" type="submit">Enregister <FontAwesomeIcon icon="save" /></button>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBijou)