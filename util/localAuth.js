const jwt=require('jsonwebtoken')

module.exports={
    createToken:(id,res)=>{
        const token = jwt.sign({id}, process.env.SECRET,{
            expiresIn:'3d'
        });
    //put token in cookie
    // pending 
     res.cookie("token", token, { maxAge: (3*24*60*60*1000) + 9999,httpOnly:true });
     return token
    },
    verifyJwt:(req,res,next)=>{
        let token= req.cookies.token 
        // this token can be get by auth bearer also
        const header=req.headers['authorization']
        if(header!== undefined)
        {
            token=header.split(" ")[1]
        }        
        if(token)
        {
            jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
                if(err)
                {
                    console.log(err.message)
                    return res.status(403).json({error:"error in authing"})
                }
                req.userId=decodedToken.id
                next()

            })
        }
        else{
           return res.status(403).json({error:"login to view"})
        }
    },
    // check current user pata nahi kyu kara (to get info of user)
    checkUser:(req,res)=>{
        const token= req.cookies.token 
        // this token can be get by auth bearer also
        if(token)
        {
            jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
                if(err)
                {
                    console.log(err.message)
                    return res.status(403).json({error:"error in authing"})
                }
                req.userId=decodedToken.id
                next()

            })
        }
        else{
           return res.status(403).json({error:"login to view"})
        }
    },
    
}