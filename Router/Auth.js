const express=require('express');
const{handleRegistration,handlelogin}=require('../Controller/Auth')
const router=express.Router();

router.post("/register",handleRegistration)
router.post("/login",handlelogin)


module.exports=router;
