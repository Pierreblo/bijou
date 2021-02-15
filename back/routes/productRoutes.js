if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}

const withAuth = require('../withAuth');
const withAuthAdmin = require('../withAuth');
const fs = require('fs');

module.exports = (app, db)=>{
    const productModel = require('../models/ProductModel')(db);
    
    app.post('/api/v1/product/save', withAuth, withAuthAdmin, async (req, res, next)=>{
        let product = await productModel.saveOneProduct(req);
        let products = await productModel.getAllProducts();
        if(product.code) {
            res.json({status: 500, err: product})
        }
        res.json({status: 200, msg: "Produit enregistré", products: products})
    })
    
    app.get('/api/v1/product/all', async (req, res, next)=>{
        let products = await productModel.getAllProducts();
        if(products.code) {
            res.json({status: 500, err: products})
        }
        
        res.json({status: 200, products: products});
        
    })
    
    app.get('/api/v1/product/one/:id', async (req, res, next)=>{
        let id = req.params.id
        let product = await productModel.getOneProducts(id);
        if(product.code) {
            res.json({status: 500, err: product})
        }
        
        res.json({status: 200, product: product[0]});
        
    })
    
    app.put('/api/v1/product/modify/:id', withAuth, withAuthAdmin, async (req, res, next)=>{
        let id = req.params.id
        let response = await productModel.modifyProduct(id, req);
        let products = await productModel.getAllProducts();
        if(response.code) {
            res.json({status: 500, err: response})
        }
        
        res.json({status: 200, msg: "Produit modififié", products: products});
        
    })
    
    app.delete('/api/v1/product/delete/:id', withAuth, withAuthAdmin,async (req, res, next)=>{
        let id = req.params.id;
        let response = await  productModel.deleteProduct(id)
        let products = await productModel.getAllProducts();
        
        if(response.code) {
            res.json({status: 500, err: response})
        }
        
        res.json({status: 200, msg: "Produit supprimé", products: products});
    })
    
    app.post('/api/v1/product/pict', withAuth, (req, res, next)=>{
        console.log(req.files);
        
       req.files.image.mv('public/images/'+req.files.image.name, (err)=>{
            console.log('ça passe', '/public/images/'+req.files.image.name)
            
            if(err) {
                res.json({status:500, msg: "Photo non enregistrée"})
            }
            
            res.json({status: 200, msg:"Photo enregistrée", url: req.files.image.name})
        })
        
    })
    
    app.delete('/api/v1/product/deletePict/:name', withAuth, async (req, res, next)=>{
        let name = req.params.name
        if(name === 'no-pict.jpg') {
            res.json({status: 400, msg: 'Suppression impossible'});
        }
        
        fs.unlink('public/images/'+name, (err)=>{
                if(err) {
                    console.log(err);
                }
                res.json({status: 200, msg: "Image supprimée"})
            })
    }) 
    
    app.put('/api/v1/product/updatequantity/:id', withAuth, async (req, res, next)=>{
        let id = req.params.id
        let product = await productModel.getOneProducts(id);
        
        let newQuantity = parseInt(product[0].quantity) - parseInt(req.body.quantity);
        
        let result = await productModel.modifyProductQuantity(id, newQuantity);
        
        if(result.code) {
            res.json({status: 500, err: result})
        }
        res.json({status: 200, msg: "Quantité modifié"})
    })
    
}