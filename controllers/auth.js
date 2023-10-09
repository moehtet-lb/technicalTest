const jwt = require('jsonwebtoken');
var { expressjwt } = require("express-jwt");
const User = require('../models/users')
exports.login = (req, res) => {
    const {username, password } = req.body
      console.log(req.body.username)
  

    switch(true){
        case !username:
            return res.status(400).json({error: 'username or password(json) is required'});
            break;
        case !password:
            return res.status(400).json({error: 'username or password(json) is required'});
            break;
    }

    User.findOne({username})
      .then((users) => {
        if(password == users.password){
            // generate token and send to client/react
            const token = jwt.sign({username},process.env.JWT_SECRET, {expiresIn: '1d' })
            return res.json({token, username})
    
        }else {
            return res.status(400).json({
                error: 'Incorrect password!'
            })
        }
      })
      .catch((error) => {
          console.log(error)
          res.status(400).json({error: 'No such data from db!'});
      })


   

};

exports.requireSignin = expressjwt({

    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth"

 });