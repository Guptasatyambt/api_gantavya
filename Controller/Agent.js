const Agent=require('../models/Agent')
const isEmailValid=require("../Validator/use-email")

async function createagent(req,res){
    const {name,email,phone,city,about,photo,price,aadhar,travelid}=req.body;
    if(!travelid||!name||!email||!phone||!city||!about||!photo||!price||!aadhar){
        return res.status(400).json("Enter all compulsory details")
    }
    if(email!=""){
      const {valid, reason, validators} = await isEmailValid(email);
   if (!valid) {
   return res.status(400).json({
     message: "Please provide a valid email address.",
     reason: validators[reason].reason
   })
 }
   
   const allReadyExist=await Agent.findOne({email})
   if(allReadyExist){
     return res.status(400).json({
       message: "Email already Exist."
     })
   }
    }
    else{
     return res.status(400).json({
       message: "Please enter email"
     })
    }
  await Agent.create({
    travelid:travelid,
    name:name,
    email:email,
    phone:phone,
    city:city,
    about:about,
    photo:photo,
    price:price,
    aadhar:aadhar,
})
return res.json("created successfully");
}

async function handleupdate(req,res){
    const travelid = req.params.id;
    const ress = await Agent.findOne({ 'travelid': travelid });
    const updateData = req.body;
    const email=updateData.email;
    console.log(email);
   if(email!=""){
     const {valid, reason, validators} = await isEmailValid(email);
      if (!valid) {
      return res.status(400).json({
       message: "Please provide a valid email address.",
       reason: validators[reason].reason
       })
      }
  
         const allReadyExist=await Agent.findOne({email})
      if(allReadyExist){
     return res.status(400).json({
      message: "Email already Exist."
       })
     }
     }
      else{
    return res.status(400).json({
      message: "Please enter email"
    })
   }
    try {
    
      if (ress) {
        const result = await Agent.findByIdAndUpdate(ress._id, { $set: updateData }, { new: true });
        // 'result' now contains the updated user document
        res.json({ success: true, message: 'User updated successfully', data: result });
      } else {
        res.status(404).json({ success: false, error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }

}

async function handledelete(req,res){
    const travelid=req.params.id;
  const ress = await Agent.findOne({ 'travelid': travelid });
  await Agent.deleteOne({ress})
  return res.status(200).json("Deleted Succesfully")
}

async function handlegetone(req,res){
    try {
        const travelid=req.params.id;
          const agent = await Agent.findOne({travelid});
          res.status(200).json(agent);
        } catch (err) {
          next(err);
         

        }

}

async function handlegetall(req,res){
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
      } catch (err) {
        next(err);
      }
}


async function handleunavailabledates(req,res){
    try{
        const travelid=req.params.id;
        const agent=await Agent.findOne({travelid});
        const {unavailabledates}=req.body;
        await Agent.updateOne({ travelid }, { $push: { unavailabledates: { $each: unavailabledates } } });
        // const result=await Agent.findByIdAndUpdate(agent._id, { $push: { unavailabledates: { $each: unavailabledate } } },{new:true});
        res.json({ success: true, message: 'User updated successfully' });

    }catch(err){
       return res.status(403).json({ success: false, message: err.message })
    }
}

async function searchagent(req,res){
  try{
  const city=req.query.city;
  const name=req.query.name;
  if(city){
  const Agents=await Agent.find({'city':city});
  return res.status(200).json(Agents)
 }
 else if(name){
  const Agents=await Agent.find({'name':name});
  return res.status(200).json(Agents)
 }

  }catch(err){
  return res.status(402).json({ success: false, message: err.message })
  }
}


async function searchagentroute(req, res) {
  try {
    const city = req.query.city;
    const fromDate = req.query.fromdate;
    const startDate = new Date(fromDate);
    const toDate = req.query.todate;
    const endDate = new Date(toDate);
    const Agents = await Agent.find({ 'city': city });
    let myArray = [];
    for (const agent of Agents) {
      const dateArray = agent.unavailabledates;
      const filteredDates = dateArray.filter(date => date >= startDate && date <= endDate);
      console.log(filteredDates);
      if ( filteredDates.length == 0) {
        myArray.push(agent);
      }
    }
    console.log(myArray);
    res.json(myArray);
  } catch (err) {
    return res.status(402).json({ success: false, message: err.message });
  }
}

module.exports={createagent,handleupdate,handledelete,handlegetone,handlegetall,searchagent,handleunavailabledates,searchagentroute}