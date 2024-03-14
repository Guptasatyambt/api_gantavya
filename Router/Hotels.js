const express = require("express");
const {createhotel,handleupdate,handledelete,handlegetone,handlegetall}=require('../Controller/Hotel')

 const router=express.Router();
//create new hotel
 router.post("/createhotel",createhotel)
 
 //Update hotel
router.put("/:id",handleupdate)
 //Delete hotel
 router.delete("/:id",handledelete)

 //get one
 router.get("/:id",handlegetone)

 //get all
 router.get("/allhotels/1",handlegetall)

 module.exports=router;