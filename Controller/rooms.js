const Hotel = require('../models/Hotel');
const Room = require('../models/rooms');

async function createRoom(req, res) {
    const hotelId = req.params.hotelid;
   

    try {
        const savedRoom = await Room.create(req.body,);
        const cretedroom= await Room.findByIdAndUpdate(savedRoom._id, 
            { hotelid: hotelId },
            {new:true})
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            return res.status(500).json("server Error")
        }
        res.status(200).json(cretedroom);
    } catch (err) {
        return res.status(500).json("server Error")
    }
};

async function updateRoom(req, res) {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
        return res.status(500).json("Server Error")
    }
}

async function updateRoomAvailability(req, res) {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (error) {
        return res.status(500).json("Server Error")

    }
}

async function deleteRoom(req, res) {
    const hotelId = req.params.hotelid;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            return res.status(500).json("Server Error")

        }
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        return res.status(500).json("Server Error")
    }
}

async function getRoom(req, res) {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        return res.status(500).json("Server Error")
    }
}

async function getRooms(req, res) {
    const hotelId = req.params.hotelid;
    try {
        const rooms = await Room.find({hotelid:hotelId});
        res.status(200).json(rooms);
    } catch (err) {
        return res.status(500).json("Server Error")
    }
}

module.exports = { 
    createRoom,
     updateRoom,
      updateRoomAvailability,
       deleteRoom,
        getRoom,
         getRooms }
