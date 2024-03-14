const express = require("express");
const { createbooking, handledelete, handlegetone, handlegetall,getoneuserbooking, getoneagentbooking } = require('../Controller/Booking')
const router = express.Router();

//create new agent
router.post("/createbooking", createbooking)



//Delete agent
router.delete("/delete/:id", handledelete)

//get agent
router.get("/getone/:id", handlegetone)

//get all agent
router.get("/getall", handlegetall)


router.get("/userbooking", getoneuserbooking)


router.get("/agentbooking", getoneagentbooking)


module.exports = router