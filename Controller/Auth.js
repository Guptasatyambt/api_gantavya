const bcrypt=require("bcrypt");

const User=require('../models/user');
const {setuser}=require('../service/auth')
const isEmailValid=require("../Validator/use-email")


async function handleRegistration(req,res){
    const {name,email,password,mobile}=req.body;
    if(!name||!email||!password){
        console.log("error")
    }
    // const {valid, reason, validators} = await isEmailValid(email);
//   if (!valid) {
//   return res.status(400).send({
//     message: "Please provide a valid email address.",
//     reason: validators[reason].reason
//   })
// }
  
  const allReadyExist=await User.findOne({email})
  if(allReadyExist){
      console.log("User already exist")
    //   return res.render("sign-up",{
    //       error:"exist"
    //   })
  }
  const bcryptpassword=await bcrypt.hash(password,10)
  await User.create({
    name:name,
    email:email,
    password:bcryptpassword,
    mobile:mobile,
    role:"Normal",
})
return res.json("created successfully");
return res.redirect("/login")
}

async function handlelogin(req,res){
    const {email,password}=req.body;
    if(!email || !password){
    //    res.json("All fields are required")
        return res.redirect("/login")
    }
    const availableUser=await User.findOne({email})
    if(!availableUser){ 
        return res.render("login",{
            error:"Invalid email or password"
        })
        // res.json("Invalid email or password");

    }
    if(availableUser&&(await bcrypt.compare(password,availableUser.password))){
    const token=setuser(availableUser);
    res.cookie("token",token);
    // return res.json("Login successfully");
    return res.redirect("/index")
    }
    // return res.json("entered details are wrong")
    return res.render("login",{
        error:"Invalid email or password"
    })
}

module.exports={handleRegistration,handlelogin}