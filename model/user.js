const mongoose = require("mongoose");
const startegery = Object.freeze({
  0: 'google',
  1: 'local',
})

const info = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      unique:true
    },
    name: {
      type: String,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    startegery:{
      enum: Object.values(startegery)
    },
    googleId:String
  },
  { timestamps: true }
);

Object.assign(info.statics,{startegery})

info.statics.loginUser=function(email){
  return new Promise((resolve,reject)=>{
    this.findOne({email})
    .exec((err,user)=>{
      if(err)
        return reject("error");
      if(!user)
        return reject("Email not registerb");
      return resolve(user)    
    })
  })

}
module.exports = mongoose.model("user", info);
