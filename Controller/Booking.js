const Booking=require('../models/Booking');
const Agent=require('../models/Agent');

async function createbooking(req,res){
    try{
        const travelid=req.query.agentid;
        const userid=req.query.userid;
     const city = req.query.city;
     const fromDate = req.query.fromdate;
     const startDate = new Date(fromDate);
     const toDate = req.query.todate;
     const endDate = new Date(toDate);
     const personCount=req.query.personcount;
     if(!travelid||!userid||!city||!startDate||!endDate||!personCount){
        return res.status(400).json("Enter all compulsory details");
    }
     const booking=await Booking.create({
        travelid:travelid,
        userid:userid,
        city:city,
        fromDate:startDate,
        toDate:endDate,
        personCount:personCount,
    });
    if(booking){
        const unavailabledates = [];
  while (startDate <=endDate) {
    unavailabledates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  console.log(unavailabledates);
        await Agent.updateOne({travelid}, { $push: { unavailabledates: { $each: unavailabledates } } });
    }
    return res.status(200).json(booking);
    }catch(err){
        res.status(500).json({ success: false, message: err.message });
    }
}

// async function handleupdate(req,res){}

async function handledelete(req,res){
    try{
        await Booking.findByIdAndDelete(req.params.id);
        return res.status(200).json("deleted")
    }catch(err){
        res.status(500).json({ success: false, message: err.message }); 
    }   
}

async function handlegetone(req,res){
    try{
        const booking=await Booking.findById(req.params.id);
     return res.status(200).json(booking);
    }catch(err){
        res.status(500).json({ success: false, message: err.message }); 
    }
}

async function handlegetall(req,res){
    try {
        const booking = await Booking.find();
        res.status(200).json(booking);
      } catch (err) {
        next(err);
      }
}

// async function searchbooking(req,res){
//     try {
//         const userid=req.query.userid;
//         const booking = await Booking.find({'':userid});
//         res.status(200).json(booking);
//       } catch (err) {
//         next(err);
//       }
// }

async function getoneuserbooking(req,res){
    try {
        const userid=req.query.userid;
        const booking = await Booking.find({'userid':userid});
        res.status(200).json(booking);
      } catch (err) {
        next(err);
      }
}

async function getoneagentbooking(req,res){
    try {
        const travelid=req.query.travelid;
        const booking = await Booking.find({'travelid':travelid});
        res.status(200).json(booking);
      } catch (err) {
        next(err);
      }
}









module.exports={ createbooking,  handledelete, handlegetone, handlegetall ,getoneuserbooking, getoneagentbooking };