
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();


router.post('/', function (req, res, next) {
  var datos="Gracias por tu compra "+req.body.firstName+" "+
  req.body.lastName+"\n"
  +"Id  de Orden: "+req.body.idOrder+"\n"
  +"Metodo: "+req.body.metodo +"\n"
  +"Monto: "+req.body.amount+" \n"
  +"Status: "+req.body.status+"\n"
  +"Fecha: "+req.body.date+"\n"
  +"Modena: "+req.body.moneda+"\n"+
  +"Codigo de autorizacion: "+req.body.authCode+"\n"
  +"Tarjeta de Credito: "+ req.body.numberCard;+"\n"
  +req.body.typeCard+"\n";
  console.log("Datos: "+datos);
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'correo@gmail.com',
      pass: 'contrasena'
    }
  });
  let mailOptions = {
    from: '"Nombre" <Correo>', // sender address
    to: req.body.mail, // list of receivers
    subject: "Transaction receipt",//req.body.subject, // Subject line
    text: datos //req.body.body, // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.render('index');
    });
});

module.exports = router;
