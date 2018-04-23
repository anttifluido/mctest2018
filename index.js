const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/edit', (req, res) => {
    var FuelSoap = require('fuel-soap');
    var options = {
      auth: {
        clientId: process.env.CLIENT_ID
        , clientSecret: process.env.CLIENT_SECRET
      }
      , soapEndpoint: 'https://webservice.s6.exacttarget.com/Service.asmx' // default --> https://webservice.exacttarget.com/Service.asmx
    };
    console.log('clientID:' + process.env.CLIENT_ID);
    var SoapClient = new FuelSoap(options);
    console.log(options);

    var options = {
      filter: {
        leftOperand: 'CustomerKey',
        operator: 'equals',
        rightOperand: '05D89268-E818-4B4E-B4DA-56EB549CA3FB'
      }
    };

    SoapClient.retrieve(
      'DataExtension',
      ["Description"],
      options,
      function( err, response ) {
        if ( err ) {
          // error here
          console.log( err );
          return;
        }

        // response.body === parsed soap response (JSON)
        // response.res === full response from request client
        console.log( response.body );
      }
    );

    res.render('pages/edit');
  })
  .get('/save', function(request, response) {
    console.log(request)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
