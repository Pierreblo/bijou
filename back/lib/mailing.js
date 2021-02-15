const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

module.exports = (mailTo, subject, title, text) =>{
    const oauth2Client = new OAuth2(
        '658138926680-it1ho4o4k7fht5vvtbu8moq3c9bjj7gl.apps.googleusercontent.com', // client Id
        'OaSVWIaK9i5twUaAz-3QIySN', // client secret
        "https://developers.google.com/oauthplayground" // Redirect URL
    )
    
    oauth2Client.setCredentials({
        refresh_token: '1//04Trc3xAToa_aCgYIARAAGAQSNwF-L9IrqpGW3QJtO8GM6qwyVtbEA1mJ9xDeNi154IP9IjKRM3uaOR2Q7NEHr0rzNSRUNMNkthw'
    })
    
    
    console.log(oauth2Client);
    
    let transporter = nodeMailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: 'pierreblondeau2@gmail.com',
            clientId: "658138926680-it1ho4o4k7fht5vvtbu8moq3c9bjj7gl.apps.googleusercontent.com", // client Id
            clientSecret: "OaSVWIaK9i5twUaAz-3QIySN",
            refreshToken: '1//04Trc3xAToa_aCgYIARAAGAQSNwF-L9IrqpGW3QJtO8GM6qwyVtbEA1mJ9xDeNi154IP9IjKRM3uaOR2Q7NEHr0rzNSRUNMNkthw',
            accessToken: "ya29.a0AfH6SMCZIvHegQdT5SuOfFCi9Q7vTJTiaryv0VDIwZ3kyosXDTpdHfpKHhOTAeKRWIkamd_XiCpOefixq_lHZZnG5jqHjGWCwth93CSClrCYgmikSTVUa2xdXIacckPozsvEmp948lUlw59t804VOkxQxeJQj6UZnIRXdODq6gY"
        }

      });
      
      let mailOptions = {
          from: '"Bijou" <pierreblondeau2@gmail.com>', // sender address
          to: mailTo, // list of receivers
          subject: subject, // Subject line
          text: '', // plain text body
          html: '<b>'+title+'</b><p>'+text+'<p>' // html body
      };
      
    transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log('ça rate');
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              //res.render('index');
    });
}