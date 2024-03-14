const express = require("express");

const Auth=require('../models/user');
 const router=express.Router();

 router.get("/",async(req,res)=>{
    res.render("home")
 })
 router.get("/index",async(req,res)=>{
   res.render("index")
})
 router.get("/signup",async(req,res)=>{
    res.render("signup")
 })
 router.get("/login",async(req,res)=>{
    res.render("login")
 })
 router.get("/about-us",async(req,res)=>{
    res.render("about-us")
 })
 router.get("/contact-us",async(req,res)=>{
    res.render("contact-us")
 })


 module.exports=router;