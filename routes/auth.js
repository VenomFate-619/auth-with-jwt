const express=require('express')
const router=express.Router()
const {verifyJwt}=require('../util')

const {register,login,dash, logout}=require('../controller/auth')

router.post('/register',register)

router.post('/login',login)

router.get('/dash',verifyJwt,dash)

router.get('/logout',logout)

module.exports=router