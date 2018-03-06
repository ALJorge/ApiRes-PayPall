var express = require('express');
var router = express.Router();
var braintree = require('braintree');

router.post('/', function(req, res, next) {
  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: 'jzfz4cwchfz6p736',
    publicKey: '8dprvggrtvscmvzv',
    privateKey: '5e0aebb3043ba77797ff347ec5627058'
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
 var primerNombre = req.body.primerNombre;
  var apellido = req.body.apellido;
  var telefono = req.body.telefono;
  var correo = req.body.correo;
  var compania = req.body.compania;
  var newTransaction = gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: nonceFromTheClient,
    customer: {
      firstName: primerNombre, 
      lastName: apellido,
      telefono: telefono,
      correo: correo,
      company: compania
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
