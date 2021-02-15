const bcrypt = require('bcrypt');
const saltRounds = 10;
 
module.exports = (_db)=>{
    db = _db;
    return OrderModel;
}

class OrderModel {
    
    static async saveOneOrder(req){
        
       
        return db.query('INSERT INTO orders (user_id, dateCreation, status) VALUES (?, NOW(), "pas encore payé")', [req.body.user_id ])
        	    .then((result)=>{
        	       return {status: 200, msg: "Commande bien enregistrée", result:result}
        	    })
        	    .catch((err)=>{
        	        return {status: 500, msg: err}
        	    })
            
    }
    
    static async saveOneOrderDetail(orderId, product_id, quantityInCart, total){
        
       
        return db.query('INSERT INTO orderdetails (order_id, product_id, quantity, total_price) VALUES (?, ?, ?, ?)', [orderId, product_id,  quantityInCart, total])
        	    .then((result)=>{
        	       return {status: 200, msg: "Détail commande bien enregistré", result:result}
        	    })
        	    .catch((err)=>{
        	        return {status: 500, msg: err}
        	    })
            
    }
    
    static async updateTotalAmount(totalAmount, orderId){
        
       
        return db.query('UPDATE orders SET totalAmount = ? WHERE id=?', [totalAmount, orderId])
        	    .then((result)=>{
        	       return {status: 200, msg: "Prix total modifié", result:result}
        	    })
        	    .catch((err)=>{
        	        return {status: 500, msg: err}
        	    })
            
    }
	static async getOneOrderById(id) {
		return db.query('SELECT * FROM orders WHERE id=?', [id])
			   .then((order)=>{
				  return {status: 200, order}
			   })
			   .catch((err)=>{
				   return {status: 500, msg: err}
			   })
   }
   static async updateStatus(status, id) {
	return db.query('UPDATE orders SET status = ? WHERE id=?', [status, id])
		   .then((order)=>{
			  return {status: 200, msg: "Status modifié"}
		   })
		   .catch((err)=>{
			   return {status: 500, msg: err}
		   })
    }
}