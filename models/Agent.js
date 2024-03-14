const mongoose = require('mongoose');

const travelAgentSchema = new mongoose.Schema({
  travelid:{
     type:String,
     require:true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  about:{
    type:String,
    require:true
},
  rating: {
    type: Number,
    default:1,
    min: 1,
    max: 5,
  },
  photo:{
    type:String
  },
  price:{
    type:String,
    required:true
  },
  // review:{
  //   type:String
  //   },
    aadhar:{
      type:String,
      required:true,
     },
  //    aadharimagefront:{
  //       type:String,
  //       required:true,
  //    },
  //    aadharimageback:{
  //     type:String,
  //     required:true,
  //  },
    unavailabledates:{
      type:[Date]
    },
    createdAt: {
      type: Date,
      default: Date.now
  },
},{timestamps:true});

 
const TravelAgent = mongoose.model('TravelAgent', travelAgentSchema);

module.exports = TravelAgent;