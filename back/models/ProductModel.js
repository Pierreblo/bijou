const bcrypt = require('bcrypt');
const saltRounds = 10;
 
module.exports = (_db)=>{
    db = _db;
    return ProductModel;
}

class ProductModel {
    
    static async saveOneProduct(req){
        return db.query('INSERT INTO products (name, description, price, url, quantity, dateCreation) VALUES (?, ?, ?, ?, ?, NOW())', [req.body.name, req.body.description, req.body.price, req.body.url, req.body.quantity])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
            
    }
    
    static async getAllProducts() {
       return db.query('SELECT * FROM products')
                .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
    }
    
    static async getOneProducts(id) {
       return db.query('SELECT * FROM products WHERE id = ?', [id])
                .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
    }
    
    
    static async modifyProduct(id, req) {
       return db.query('UPDATE products SET name = ?, description = ?, price = ?, url = ?, quantity = ? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.url, req.body.quantity, id])
                .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
    }
    
    static async deleteProduct(id) {
       return db.query('DELETE FROM products WHERE id = ?', [id])
                .then((response)=>{
                    return response
                })
                .catch((err)=>{
                    return err;
                })
    }
    
    
    static async modifyProductQuantity(id, quantity) {
       return db.query('UPDATE products SET quantity = ? WHERE id = ?', [quantity, id])
                .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
    }
}