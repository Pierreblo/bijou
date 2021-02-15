if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}

const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);
    
    app.get('/api/v1/checkToken', withAuth, async (req, res, next)=>{
        let user = await userModel.getOneUserByMail(req.email) 
        
	    res.json({status: 200, msg: "Token valide ", user: user})
	})
	
 
}