module.exports = {



    login : function(req, res){
      var jwt = require('jwt-simple');
      console.log('login');
      console.log(req);
      console.log('headers');
      console.log(req.headers)

      /*var secret = process.env.SECRET;
       var decodedJWT = jwt.decode(req.query.encodedJWT, secret);
      console.log(decodedJWT);*/
    },
    logout : function(req, res){
      console.log('logout');
       //do something
    },

}
