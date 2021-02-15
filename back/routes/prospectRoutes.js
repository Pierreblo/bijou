if(!process.env.HOST_DB) {
    var config = require('../config')
}else {
    var config = require('../config-exemple')
}
module.exports = (app, db)=>{
    const prospectModel = require('../models/ProspectModel')(db);
    
    app.post('/api/v1/prospect/save', async (req, res, next)=>{
        let prospect = await prospectModel.saveOneProspect(req);
        if(prospect.code) {
            res.json({status: 500, err: prospect})
        }
        res.json({status: 200, msg: "Inscription validée", prospect: prospect})
    })
}