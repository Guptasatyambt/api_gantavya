const express = require("express");
const { createagent, handleupdate, handledelete, handlegetone, handlegetall, searchagent, handleunavailabledates,searchagentroute } = require('../Controller/Agent')
const router = express.Router();

//create new agent
router.post("/createagent", createagent)

//Update agent
router.put("/update/:id", handleupdate)

//Delete agent
router.delete("/delete/:id", handledelete)

//get agent
router.get("/getone/:id", handlegetone)

//get all agent
router.get("/getall", handlegetall)

//searching route
router.get("/search", searchagent);

//update unavailable dates
router.put("/unavailabledates/:id", handleunavailabledates);

//search agent
router.get("/searchagent",searchagentroute)

module.exports = router