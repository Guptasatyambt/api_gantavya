const User=require('../models/user')
const isEmailValid=require("../Validator/use-email")


async function handleRegistration(req,res){
    const {name,email,mobile}=req.body;
    const userid=req.params.id;
    if(!userid||!name||!email){
        console.log("error")
    }
    if(email!=""){
      const {valid, reason, validators} = await isEmailValid(email);
   if (!valid) {
   return res.status(400).send({
     message: "Please provide a valid email address.",
     reason: validators[reason].reason
   })
 }
   
   const allReadyExist=await User.findOne({email})
   console.log(allReadyExist);
   if(allReadyExist){
     return res.status(400).send({
       message: "Email already Exist."
     })
   }
    }
    else{
     return res.status(400).send({
       message: "Please enter email"
     })
    }
  await User.create({
    userid:userid,
    name:name,
    email:email,
    mobile:mobile,
})
return res.json("created successfully");
}


async function updateUser(req,res){
    const userId = req.params.id;
    const ress = await User.findOne({ 'userid': userId });
    const updateData = req.body;
    const email=updateData.email;
   if(email!=""){
     const {valid, reason, validators} = await isEmailValid(email);
  if (!valid) {
  return res.status(400).send({
    message: "Please provide a valid email address.",
    reason: validators[reason].reason
  })
}
  
  const allReadyExist=await User.findOne({email})
  console.log(allReadyExist);
  if(allReadyExist){
    return res.status(400).send({
      message: "Email already Exist."
    })
  }
   }
   else{
    return res.status(400).send({
      message: "Please enter email"
    })
   }
    try {
    
      if (ress) {
        const result = await User.findByIdAndUpdate(ress._id, { $set: updateData }, { new: true });
        // 'result' now contains the updated user document
        res.json({ success: true, message: 'User updated successfully', data: result });
      } else {
        res.status(404).json({ success: false, error: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
    
}

async function getUser(req,res){
    try {
      const userid=req.params.id;
        const user = await User.findOne({userid});
        res.status(200).json(user);
      } catch (err) {
        next(err);
      }
}

async function getUsers(req,res){
    try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        next(err);
      }
      
}

async function DeleteUser(req,res){
  const UserId=req.params.id;
  const ress = await User.findOne({ 'userid': UserId });
  await User.deleteOne({ress})
  // await User.findByIdAndDelete(req.params.id)
  return res.status(200).json("Deleted Succesfully")
}


module.exports={
  handleRegistration,
    updateUser,
    getUser,
    DeleteUser,
    getUsers
}
