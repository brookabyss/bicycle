var mongoose = require('mongoose');
var User = mongoose.model('User');
var Listing = mongoose.model('Listing');

module.exports ={// if errors ,send errors
  
  create: function(req,res){
    console.log("create function",req.body)
    let user= new User({email: req.body.email, password: req.body.password  })
    user.name.first=req.body.name.first
    user.name.last=req.body.name.last
    user.save(function(err){
          if (err){
            console.log("Inside register error",err)
            // user_errors={email_errors:{message: "Why don't you try a different email?"}}
            res.json(false)
            // res.render('index',{title: 'You have errors',errors: {user_errors:{message: "Why don't you try a different email?"}}})
          }
          else{
            // req.session.status= true
            req.session.user_id=user._id
            console.log("From registration the currrent user is ", req.session.user_id)
            res.json(user)
          }
        })
  },
  login: function(req,res){
    console.log("in login", req.body)
    User.findOne({email: req.body.email,password: req.body.password})
    .then(user => {
      if(!user){
        res.json(false)
      }
      else{
        req.session.user_id=user._id
        console.log("current user id is", req.session.user_id)
         res.json(user)
      }
    })
    .catch(err=> res.json(false))
  },
  logged_in_user: function(req,res){
    console.log("terrific from logged_in_user")
    console.log(req.session.user_id)
    if(req.session.user_id){
      console.log("from logged_in_user")
      User.findOne({_id: req.session.user_id})
      .then(user=>res.json(req.session.user_id))
      .catch(err=>console.log(err))
    }
    else{
      console.log("redirecting to home")
      res.json(false)
    }
  },
  logout: function(req,res){
    console.log("bye bye, loggin out")
    req.session.destroy()
    res.redirect('/')
  }
}
