
const Hotel=require('../models/Hotel');

async function createhotel(req,res){
    const newhotel=await Hotel.create(req.body)
     return res.status(200).json(newhotel)
}
async function handleupdate(req,res){
    const updatehotel=await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
     return res.status(200).json(updatehotel)
}
async function handledelete(req,res){
    await Hotel.findByIdAndDelete(req.params.id)
     return res.status(200).json("deleted")
}
async function handlegetone(req,res){
    const hotel=await Hotel.findById(req.params.id)
     return res.status(200).json(hotel)
}
async function handlegetall(req, res) {
   
    try {
        const hotels = await Hotel.find()
      return res.status(200).json(hotels);
    
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  


module.exports={createhotel,handleupdate,handledelete,handlegetone,handlegetall}