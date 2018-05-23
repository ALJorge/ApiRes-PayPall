var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
//jzfz4cwchfz6p736 Mover
    //8dprvggrtvscmvzv Mover
    //5e0aebb3043ba77797ff347ec5627058 Mover
    merchantId: '',
    publicKey: '',
    privateKey: ''
  });

  var nonceFromTheClient = req.body.paymentMethodNonce;
  var primerNombre = req.body.primerNombre;
  var apellido = req.body.apellido;
  var mail = req.body.mail;
  var precio = req.body.precio;

  //console.log("El precio es: "+precio);
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale({
    amount: precio,
    paymentMethodNonce: nonceFromTheClient,
    customer: {
      firstName: primerNombre,
      lastName: apellido,
      email: mail
    },
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, function(error, result) {
      if (result) {
        res.send(result);
      } else {
        res.status(500).send(error);
      }
  });
});

module.exports = router;
