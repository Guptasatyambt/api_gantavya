const express = require("express");
const {
    handleRegistration,
    updateUser,
    getUser,
    DeleteUser,
    getUsers
}=require('../Controller/User')
const router=express.Router();
router.post("/register/:id",handleRegistration)

//UPDATE
router.put("/update/:id", updateUser);
//Delete
router.delete("/delete/:id",DeleteUser)
//GET
router.get("/getone/:id", getUser);

//GET ALL
router.get("/getall/", getUsers);


module.exports =router