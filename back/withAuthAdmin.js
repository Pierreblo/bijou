const withAuthAdmin = (req, res, next)=>{
    console.log('withAuth');
    if(req.session.isLogged && req.session.user.role === "admin") {
       next();
    } else {
       res.redirect('/login')
    }
}
module.exports = withAuthAdmin;