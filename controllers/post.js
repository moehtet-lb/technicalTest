const Post = require('../models/post');
const slugify = require('slugify')
const User = require('../models/users')
const jwt = require('jsonwebtoken');
var { expressjwt } = require("express-jwt");


exports.create = (req, res) => {
    // console.log(req.body);
    const {title, content, user} = req.body
    const slug = slugify(title) // My Post -> my-post

    //validate
    switch(true){
        case !title:
            return res.status(400).json({error: 'Title is required'});
            break;
        case !content:
            return res.status(400).json({error: 'Content is required'});
            break;
    }

    // database create 

    Post.create({title, content, user, slug })
    .then((result) => {
        res.json(result);
        // console.log(res.json(result));
    })
    .catch((error) => {
       // console.log(error)
        res.status(400).json({error: 'Duplicate post. Try another title'});
    })
    // Post.create({title, content, user, slug },(err, post) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).json({error: 'Duplicate post. Try another title'});
    //     }

    //     res.json(post);
    // })
};

exports.list = (req, res) => {
    Post.find({})
    .limit(10)
    .sort({createdAt: -1})
    .then((result) => {
        res.json(result);
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({error: 'Duplicate post. Try another title'});
    })
}

exports.read = (req, res) => {
    const { slug } = req.params;
  //  console.log(req.params.slug)

    Post.findOne({slug})
    .then((post) => {
        res.json(post);
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({error: 'No such data from db!'});
    })
}

exports.update = (req, res) => {
    const {slug} = req.params;
    const {title, content, user} = req.body;
    Post.findOneAndUpdate({slug}, {title, content, user}, {new: true})
    .then((post) => {
        res.json(post);
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.remove = (req, res) => {
    const { slug } = req.params;
  //  console.log(req.params.slug)

    Post.findOneAndRemove({slug})
    .then((post) => {
        if (!post)  {
            res.json(  "No Data to delete!")
        }

        else {
            res.json("data have beend deleted!")
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(400).json({error: 'No such data from db!'});
    })
}

exports.signup = (req, res) => {

       console.log(req.sessionID);
      const {username, password} = req.body
      const sessionid = req.sessionID
       mtoken = jwt.sign({username},process.env.JWT_SECRET, {expiresIn: '1d' })
  
      //validate
      switch(true){
          case !username:
              return res.status(400).json({error: 'Username and Password(json) is required to sign up!'});
              break;
          case !password:
              return res.status(400).json({error: 'Username and Password(json) is required to sign up!'});
              break;
      }
  
      // database create 
  
      User.create({username, password, mtoken, sessionid})
      .then((result) => {
          res.json("You have successfully registered!");
          console.log(result);
      })
      .catch((error) => {
         // console.log(error)
          res.status(400).json({error: 'Duplicate UserName. Try another Username!'});
      })
}