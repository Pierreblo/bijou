const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const fileUpload = require("express-fileupload");
app.use(fileUpload({
    createParentPath: true
}))
const cors = require('cors');
app.use(cors());

if(!process.env.HOST_DB) {
	var config = require('./config')
} else {
	var config = require('./config-exemple')
}

const mysql = require('promise-mysql');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const comRoutes = require('./routes/comRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const prospectRoutes = require('./routes/prospectRoutes');

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT || config.db.port;

mysql.createConnection({
    host: host,
	database: database,
	user: user,
	password: password,
	port: port
  })
  .then((db) => {
    console.log('Bien connecté');
    setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get('/', (req, res, next)=>{
	    res.json({status: 200, msg: "Connecté"})
	})
	
	userRoutes(app, db);
    authRoutes(app, db);
    comRoutes(app, db);
	productRoutes(app, db);
	orderRoutes(app, db);
	prospectRoutes(app, db);
})
.catch((err)=>{
    console.log(err);
})

const PORT = 8000;
app.listen(PORT, ()=>{
	console.log('port '+PORT+' ok');
})