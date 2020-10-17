const User = require("../model/user");
const {createToken}=require('../util')
const bcrypt=require('bcrypt')
module.exports = {
  register: (req, res) => {
    const newUser=new User(req.body)
    newUser.save()
      .then((user) => {
        if (!!user) {
          return res.json({ user });
        }
      })
      .catch((err) => {
        if (err) {
          err.code = err.code ? 1100 : null;
          if (err.code) {
            return res.status(409).json({
              error: "Email already register",
            });
          }
          console.log(err)
          return res.status(400).json({
            error: "NOT able to save user in DB",
          });
        }
      });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    // User.findOne({email})
    //     .then((user)=>{
    //         if(!user)
    //         {
    //             return res.status(400).json({error: "USER email does not exists"})
    //         }
    //         // TODO compare password
    //         bcrypt.compare(password, user.password, function(err, result) {
    //             if(!result){  return res.status(401).json({
    //                 error: "password do not match"
    //               });}
    //                 // TODO token creation
    //             var token=createToken(user._id,res)
    //             return res.json({ token,...user});
    //         })
    //     })
    //     .catch((err)=>{
    //         return res.status(500).json({err})
    //     })
      User.loginUser(email)
      .then((user)=>{
        // TODO compare password
        bcrypt.compare(password, user.password, function(err, result) {
            if(!result){  return res.status(401).json({
                error: "password do not match"
              });}
                // TODO token creation
            var token=createToken(user._id,res)
            return res.json({ token,user});
        })
    })
    .catch((err)=>{
      console.log(err)
      return res.status(500).json({err})
  })
        
  },
  logout:(req,res)=>{
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });
  },
  dash:(req,res)=>{
    res.json({msg:"success"})
  }
};
