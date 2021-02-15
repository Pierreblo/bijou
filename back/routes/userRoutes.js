const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}

let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');
const mail = require('../lib/mailing');

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);
    
    app.post('/api/v1/user/save', async (req, res, next)=>{
	    let result = await userModel.saveOneUser(req);
	    if(result.code) {
    		res.json({status: 500, err: result})
    	}
    	if(result.status === 501 ) {
    		res.json(result)    	
    	}
	    mail(
            req.body.email, 
            "Validation de votre compte", 
            "Bienvenu sur Bijou", 
            'Pour valider votre mail, cliquez <a href="http://localhost:8000/api/v1/user/validate/'+result.key_id+'">ici<a/> !'
            )
    	res.json({status: 200, msg: "Un email de confirmation vous a été envoyé"})
	})
	app.get('/api/v1/user/validate/:key_id', async (req, res, next)=>{
		let key_id = req.params.key_id;
	   console.log(key_id)
	   let validate = await userModel.updateValidateUser(key_id);
	   if(validate.code) {
		   res.json({msg: 'probleme', error: validate});
	   }
	   res.send('Bravo compte validé !');
    })
	app.post('/api/v1/user/forgot', async (req, res, next)=>{
		let result = await userModel.updateKeyId(req.body.email);
		if(result.code) {
			res.json({status: 500, msg: "nous n'avons pas pu vous envoyer un email", error: result});
		}
		let key_id = result.key_id;
		mail(
		   req.body.email, 
		   "changement de mot de passe", 
		   "Mot de passe oublié ?", 
		   'Pour modifier votre mot de passe, cliquez <a href="http://localhost:8000/api/v1/user/changePassword/'+key_id+'">ici<a/> !'
		   );
		res.json({status: 200, msg: "Un email pour réinitialiser votre mot de passe vous a été envoyé"})
   })
   app.get('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
	   let key_id = req.params.key_id;
	   res.render('forgot', {key_id: key_id, error: null})
   })
	app.post('/api/v1/user/changePassword/:key_id', async (req, res, next)=>{
	   let key_id = req.params.key_id;
	   let error = null
	   if(req.body.password1 !== req.body.password2) {
		   error = "Vos deux mots de passe ne sont pas identique !";
	   } else {
		   let result = await userModel.updatePassword(req.body.password1, key_id);
		   if(result.code) {
			   error = "le mot de passe ne s'est pas modifié !"
		   } else {
			   error = "le mot de passe a bien été modifié !"
		   }
	   }
	   res.render('forgot', {key_id: key_id, error: error})
    })
	    app.post('/api/v1/user/login', async (req,  res, next)=>{
		let user = await userModel.getOneUserByMail(req.body.email);	
    	if(user.length === 0) {
    		res.json({status: 404, msg: "email inexistant dans la base de donnée"})
    	} else {
    	    if(user[0].validate === "no") {
        	    res.json({status: 403, msg: "Votre compte n'est pas validé"})
        	}
        	let same = await bcrypt.compare(req.body.password, user[0].password);
        	if(same) {
        		let infos = {id: user[0].id, email: user[0].email}
				let token = jwt.sign(infos, secret);
				res.json({status: 200, msg: "connecté", token: token, user: user[0]})
        	} else {
        		res.json({status: 401, msg: "Utilisateur ou mot de passe incorrect"})
			}
    	}
	})
	    app.post('/api/v1/user/update', withAuth, async (req, res, next)=>{
		let result = await userModel.updateUser(req);
		let user = await userModel.getOneUserByMail(req.body.email)
		res.json({status: 200, msg: 'Utilisateur modifié', user: user})
   })
}