import React from 'react'
import {Link} from 'react-router-dom';
import {config} from '../../config';
import {connect} from 'react-redux';
import {deleteProduct, deletePict} from '../../api/product';
import {loadAllProducts} from '../../actions/product/productAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Admin extends React.Component {
    constructor(props) {
        super(props);
    }
    onClickDelete = (id)=>{
        deleteProduct(id)
        .then((response)=>{
            console.log(response);
            let index = this.props.product.bijoux.findIndex((bijou)=>{return bijou.id === parseInt(id)});
            if(response.status === 200) {
                deletePict(this.props.product.bijoux[index].url)
                .then((res)=>{
                    console.log(res);
                })
                this.props.loadAllProducts(response.products);
            }
        })
    }

    renderProductList() {
        return this.props.product.bijoux.map((bijou)=>{
            return (<tr key={bijou.id}>
                <td><img src={config.pict_url+bijou.url} alt="bijou-pict"/></td>
                <td>{bijou.id}</td>
                <td><p>{bijou.name}</p><p>{bijou.description}</p></td>
                <td>{bijou.price}€</td>
                <td>{bijou.quantity}</td>
                <td>
        
                    <Link to={"/admin/edit/"+bijou.id}><button className="button">Modifier <FontAwesomeIcon icon="cog" /></button></Link>
                
                    <button className="button"
                        onClick={(e)=>{
                            e.preventDefault();
                            this.onClickDelete(bijou.id)
                        }}
                    >
                        Supprimer <FontAwesomeIcon icon="trash-alt" />
                    </button>
                </td>
            </tr>)
        })
    }
    
    render(){
        return (
            <div className="page"> 
                <h3>Gestion des stocks</h3>
                <Link to="/admin/addBijou"><button className="addProduct">Ajouter un produit <FontAwesomeIcon icon="plus-circle" /></button></Link>
                <table className="tableBijou">
                    <tbody>
                        <tr>
                            <td className="bold">Image</td>
                            <td className="bold">Id</td>
                            <td className="bold">Nom + Description</td>
                            <td className="bold">Prix</td>
                            <td className="bold">Quantité</td>
                            <td className="bold"> Action</td>
                        </tr>
                        {
                            <React.Fragment>
                               { this.renderProductList() }
                            </React.Fragment>
                        }
                    </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)