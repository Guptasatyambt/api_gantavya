const mongoose=require("mongoose");

const Hotelschema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    type:{
        type:String,
        require:true
    },
    description:{
         type:String,
         require:true
    },
    city: {
      type: String,
      required: true,
    },
  location:{ 
    type:String,
    require:true
},
distancefromcitycentre:{
    type:Number
},
review:{
type:String
},
  pricePerNight: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default:1,
    min: 1,
    max: 5,
  },
  photo:{
    type:[String]
  },
  room:{
    type:[Number]
  },
},{timestamps:true});

const Hotel = mongoose.model('Hotel',Hotelschema);

module.exports=Hotel;