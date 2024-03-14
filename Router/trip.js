const express = require("express");
const {createRoom,updateRoom,updateRoomAvailability,deleteRoom,getRoom,getRooms}=require('../Controller/rooms')
const router=express.Router();