require("dotenv").config();
const express=require('express');
const { errorhandler } = require("./middleware/errorHandler");


const path=require('path')

// const authrouter=require('./Router/Auth')
// const hotel=require('./Router/Hotels')
// const room=require('./Router/rooms')

const user=require('./Router/User');
const agent=require('./Router/Agent');
const booking=require('./Router/Booking');

const {ConnectionDB}=require('./connection')

const app=express();
const port=process.env.PORT;

ConnectionDB(process.env.MONGO_URL)

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static('public'));

app.use("/",user);
app.use("/agent",agent);
app.use("/booking",booking);

// app.use("/auth",authrouter);
// app.use("/hotel",hotel)
// app.use("/room",room)



app.use(errorhandler)

app.listen(port ,()=>{
    console.log(`server started at port ${port}`)
})