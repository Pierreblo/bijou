module.exports = (_db)=>{
    db = _db;
    return ProspectModel;
}

class ProspectModel {

    static async saveOneProspect(req){
        let prospect = await db.query('SELECT * FROM prospect WHERE email = ?', [req.body.email]);
        if(prospect.length > 0) {
			return {status: 500, msg: "email déjà enregistré"}
        }
        return db.query('INSERT INTO prospect (email, dateCreation) VALUES ( ?, NOW())', [req.body.email])
            .then((response)=>{
                return response
            })
            .catch((err)=>{
                return err;
            })
    }
}