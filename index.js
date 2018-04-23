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
    };

    SoapClient.retrieve(
      'DataExtensionObject[EmailContent]',
      ["Client","Content","Modified"],
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
        console.log( response.body.Results[0].Properties );
      }
    );

    const FuelRest = require('fuel-rest');
    const optionsRest = {
    	auth: {
    		// options you want passed when Fuel Auth is initialized
        clientId: process.env.CLIENT_ID
        , clientSecret: process.env.CLIENT_SECRET
    	},
    	origin: 'https://webservice.s10.exacttarget.com/Service.asmx' // default --> https://www.exacttargetapis.com
    };

    const RestClient = new FuelRest(optionsRest);

    const optionsRestReq = {
    	uri: '/asset/v1/content/assets',
      headers:{},
    	multipart: {
        "name": "TestUpload",
        "assetType": {
          "name": "gif",
          "id": 20
         },
         "file": "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      }
    	// other request options
    };


    RestClient.post(optionsRestReq, (err, response) => {
    	if (err) {
    		// error here
        console.log('error');
    		console.log(err);
    	}

    	// will be delivered with 200, 400, 401, 500, etc status codes
    	// response.body === payload from response
    	// response.res === full response from request client
      console.log('response');
    	console.log(response);
    });





    res.render('pages/edit');
  })
  .get('/save', function(request, response) {
    console.log(request)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
