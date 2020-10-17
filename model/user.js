const mongoose = require("mongoose");
const bcrypt=require('bcrypt');
const { use } = require("../routes/auth");
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
    }
  },
  { timestamps: true }
);
info.pre('save',async function  (next) {
    // bcrypt.hash(this.password, 10, function(err, hash) {
    //     if(err) next(err)
    //    if(hash)
    //    {
    //        this.password=hash;
    //        console.log(hash+" "+this.password)
    //        next()
    //    }
    // });
   const salt=await bcrypt.genSalt()
   this.password=await bcrypt.hash(this.password,salt)
   next()
})
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
