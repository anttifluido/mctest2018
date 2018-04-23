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
      , soapEndpoint: 'https://webservice.s10.exacttarget.com/Service.asmx' // default --> https://webservice.exacttarget.com/Service.asmx
    };

    var SoapClient = new FuelSoap(options);

    var reqoptions = {
      filter: {
        leftOperand: 'CustomerKey',
        operator: 'equals',
        rightOperand: 'B1888E05-F9DE-42E1-A96D-3DC720957583'
      }
    };

    SoapClient.retrieve(
      'DataExtension',
      ["Description"],
      reqoptions,
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

    var reqoptions = {
      filter: {
        leftOperand: 'Client',
        operator: 'equals',
        rightOperand: 'Helsinki'
      },
      clientIDs: [{ ID:100003941 }]
    };

    SoapClient.retrieve(
      'DataExtensionObject["EmailContent"]',
      ["ObjectID"],
      reqoptions,
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
