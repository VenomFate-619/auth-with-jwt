const User = require("../model/user");
const { createToken } = require("../util/localAuth");
const bcrypt = require("bcrypt");
const axios=require('axios')
const {urlGoogle,getGoogleAccountFromCode}=require('../util/googleAuth')
module.exports = {
  register: async (req, res) => {
    // generating password
    const salt=await bcrypt.genSalt()
    req.body.password=await bcrypt.hash(req.body.password,salt)
    const newUser = new User({...req.body,startegery:'local'});
    newUser
      .save()
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
              error: "Email alreusery register",
            });
          }
          console.log(err);
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
      .then((user) => {
        // TODO compare password
        bcrypt.compare(password, user.password, function (err, result) {
          if (!result || err) {
            return res.status(401).json({
              error: "password do not match",
            });
          }
          // TODO token creation
          var token = createToken(user._id, res);
          return res.json({ token, user });
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ err });
      });
  },
  logout: (req, res) => {
    res.clearCookie("token");
    res.json({
      message: "User signout successfully",
    });
  },
  dash: (req, res) => {
    console.log(req.userId);
    res.json({ msg: "success" });
  },
  googleLogin:(req,res)=>{
    var url=urlGoogle()
    req.url=url
    res.json({url})
  },
  call:async (req,res)=>{
    try {
      var data = await getGoogleAccountFromCode(req.query.code)
      // put token in this url to get scope 
      var urlParams = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.tokens}`
      // https://www.googleapis.com/oauth2/v3/userinfo?access_token={access_token}
      var response=await axios.get(urlParams)
      var user=await User.findOne({email:response.data.email})
      if(user)
      {
        var token = createToken(user._id, res);
        return res.json({ token, user });
      }
       user=await User.create({
        email:response.data.email,
        name:response.data.name,
        startegery:{enum:'google'},
        googleId:response.data.sub
      })
      var token = createToken(user._id, res);
      return res.json({ token, user });
    } catch (error) {
      console.log(error);
     return res.status(500).json({'msg':"failed"})
    }
  }
}
