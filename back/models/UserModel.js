const bcrypt = require('bcrypt');
const saltRounds = 10;
var randomId = require('random-id');
var len = 30;
var pattern = 'aA0'

module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    static async saveOneUser(req){
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        console.log(hash);

        let key_id = randomId(len, pattern);

        let user = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
        
        if(user.length > 0) {
			return {status: 501, msg: "email déjà utilisé"}
        }
        return db.query('INSERT INTO users (firstName, lastName, email, password, role, address, zip, city, phone, dateCreation, validate, key_id) VALUES( ?, ?, ?, ?, "user", ?, ?, ?, ?, NOW(), "no", ?)', [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.phone, key_id ])
        	    .then((result)=>{
                   console.log('REPONSE',result)
                   result.key_id = key_id;
        	       return result
        	    })
        	    .catch((err)=>{
        	        return err
        	    })
    }
    
    static async getOneUserByMail(email) {
        return db.query('SELECT * FROM users WHERE email = ?', [email])
                .then((user)=>{
                    if(user.length === 0) {
                        return {status: 404, msg: "le mail n'existe pas dans la base de donnée"}
                    }
                    return user[0]
                })
                .catch((err)=>{
                    return err
                })
    }
    static async updateValidateUser(key_id){
		let user = await db.query('UPDATE users SET validate = "yes" WHERE key_id = ?', [key_id]);
		return user;
	}
	static async updateKeyId(email){
		let key_id = randomId(len, pattern);
		let user = await db.query('UPDATE users SET key_id = ? WHERE email = ?', [key_id, email]);
		let result = {key_id: key_id, user: user}
		return result;
	}
    static async updatePassword(newPassword, key_id){
		let hash = await bcrypt.hash(newPassword, saltRounds);
		let result = await db.query('UPDATE users SET password = ? WHERE key_id = ?', [hash, key_id]);
		return result;
	}
    
    static async updateUser(req) {
        return db.query('UPDATE users SET firstName = ?, lastName=?, address= ?, zip= ?, city = ?, phone= ? WHERE id =?', [req.body.firstName, req.body.lastName, req.body.address, req.body.zip, req.body.city, req.body.phone, req.body.id])
                .then((result)=>{
                    return result;
                })
                .catch((err)=>{
                    return err
                })
    }
}