if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}

const withAuth = require('../withAuth');
const mail = require('../lib/mailing');

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);

    // exemple envoie mail

   app.get('/api/v1/sendMail', withAuth, async (req, res, next)=>{
        //console.log(req)
        mail('pierreblondeau2@gmail.com', 'test mail', 'Bonjour', 'ceci est un test d\'envoi de mail');
        res.json({msg: 'envoi mail'})
    })

}