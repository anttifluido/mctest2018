module.exports = {



    login : function(req, res){
      var jwt = require('jwt-simple');

      console.log(req.body.jwt)

      /*var secret = process.env.SECRET;
       var decodedJWT = jwt.decode(req.query.encodedJWT, secret);
      console.log(decodedJWT);*/
    },
    logout : function(req, res){
      console.log('logout');
       //do something
    },

}
