if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}

const withAuth = require('../withAuth');
const stripe = require('stripe')('sk_test_51HmzXIDAsEYmltgoQeQvcci5Bvdan4ksZOAFT2uMyFdiV8zKN9LRobzpvC0aDSkW0moOblqaC1hivBm3aUe2nmeG00Gi1oxyc2')

module.exports = (app, db)=>{
    const orderModel = require('../models/OrderModel')(db);
    const productModel = require('../models/ProductModel')(db);


    
    app.post('/api/v1/order/save', withAuth, async (req, res, next)=>{
	    let response = await orderModel.saveOneOrder(req);
	    if(response.status === 500) {
	        res.json({status: 500, msg: "Commande non enregistrée"})
	    }
	    let orderId = response.result.insertId
	    
	    let basket = req.body.basket;
	    let totalAmount = 0;
	    for(let i = 0; i < basket.length; i++) {
	        let product = await productModel.getOneProducts(basket[i].id);
	        basket[i].safePrice = product[0].price;
	        let total = basket[i].safePrice *  basket[i].quantityInCart;
	        totalAmount += total;
	        
	 
	        let result2 = await orderModel.saveOneOrderDetail(orderId, basket[i].id, basket[i].quantityInCart, total);
	        if(result2.status === 500) {
    	        res.json({status: 500, msg: "Detail de la commande enregistré"})
    	    }
	        console.log('result2', result2);
	        let result3 = await orderModel.updateTotalAmount(totalAmount, orderId);
	        if(result3.status === 500) {
    	        res.json({status: 500, msg: "Erreur modification du prix"})
    	    }
	    } 
	    
	    res.json({status: 200, msg: "Commande bien enregistrée", orderId: orderId})
	    
	})
	
	app.post('/api/v1/order/payment', withAuth, async (req, res, next)=>{
		
		let order = await orderModel.getOneOrderById(req.body.orderId);
		console.log(order);
		const paymentIntent = await stripe.paymentIntents.create({
			amount: parseInt(order.order[0].totalAmount * 100),
			currency: "eur",
			metadata: {integration_check: 'accept_a_payment'},
			receipt_email: req.body.email
		})
		
		res.json({client_secret: paymentIntent['client_secret']})
	})
	
	app.post('/api/v1/order/updateStatus',withAuth, async (req, res, next)=>{
		let status = await orderModel.updateStatus(req.body.status, req.body.orderId);
		console.log(status)
		
		res.json(status);
	})
	
	
	

}