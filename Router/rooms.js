const express = require("express");
const {createRoom,updateRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms}=require('../Controller/rooms')
const router=express.Router();
//create 
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);
//DELETE
router.delete("/:id/:hotelid", deleteRoom);
//GET
router.get("/:id", getRoom);
//GET ALL
router.get("/allrooms/:hotelid", getRooms);

module.exports=router