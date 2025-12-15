const express = require('express');
const app = express();
require("dotenv").config(); 
const cors = require('cors');
const bodyparser = require('body-parser');
const mg = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer=require('nodemailer')
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mg.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.log('MongoDB connection error:', error));

const schema = new mg.Schema({
  name: String,
  email:String ,
  number: Number,
  password: String,
  otp: Number,          
  otpExpire: Date ,
});

const figmaData = mg.model('figmaData', schema);
const Jwt_key = process.env.JWT_KEY;

app.post('/signup', async (req, res) => {
  try {
    const {name,number,email,password } = req.body;

    if (!email || !password){
      return res.json({ status: "error", message: "Email and password required" });
    }
    if(!(password.length > 5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password))){
      return res.json({ status: "error", message: "Password must contain uppercase, lowercase, symbol and minimum length 6" })
    }
    const exists = await figmaData.findOne({ email });
    if (exists) return res.json({message:"Email exists"});
    const user = new figmaData({name,number,email,password });
    await user.save();
    const token = jwt.sign({id: user._id, email: user.email }, Jwt_key,{expiresIn:'1Y'});
    res.json({ status:"ok", message:"Signup successful",token });
  } catch (error) {
    console.log(error);
    res.json({status:"error",message:"Error submitting data" });
  }
});

app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await figmaData.findOne({ email });
    if (!user) return res.json({message: "Email not found" });

    if (user.password != password) {
      return res.json({ status: "error", message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, Jwt_key,{expiresIn:'1Y'});
    return res.json({status:'ok',message:"Login successful",token });
  } catch (error) {
    console.log(error);
    return res.json({message: "signin error" });
  }
});

app.get('/dashboard', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.json({ status: "error", message: "Access Denied" });
  }
  try {
    const decoded = jwt.verify(token, Jwt_key);
    res.json({ status: "ok", message: "Dashboard Data", userId: decoded.id });
  } catch (err) {
    res.json({ status: "error", message: "Invalid Token" });
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,         
    pass: process.env.MAIL_PASS,      
  },
});

app.post("/forgot", async (req, res) => {
  try {
    const {email} = req.body;
    const user = await figmaData.findOne({email});
    if (!user) {
      return res.json({status:'error',message:"Email not found" });
    }
    // res.json({status:'ok',message:'email varifid success'})
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('mail error:',error);
        return res.json({ status: "error", message: "Email sending failed" });
      }
    });
    return res.json({ status: "ok", message: "OTP sent to your email" });

  } catch (error) {
    console.log(error);
    res.json({message: "Error updating password" });
  }
});

app.post('/varifyotp',async(req,res)=>{
  try{
      const {otp,email}=req.body;
      const user=await figmaData.findOne({email})
      if (!user) {
        return res.json({message:"Email not found" });
      }
      // const otpw = Math.floor(100000 + Math.random() * 900000).toString();
      

    // const mailOptions = {
    //   from: "prathamcd003@gmail.com",
    //   to: email,
    //   subject: "Your OTP Code",
    //   text: `Your OTP is: ${otp}.`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //   if (error) {
    //     console.log(error);
    //     return res.json({ status: "error", message: "Email sending failed" });
    //   }
    // });
    // res.json({ status: "ok", message: "OTP sent to your email" });

    if ((user.otp).toString() !== otp) {
      return res.json({ status:'wrong',message: "otp not validd" });
    }
    user.otp = null;
    await user.save();
    return res.json({status:"ok", message:'OTP verified'});
  }
  catch(error){
    res.json({message:'error in varify otp'})
  }
})

app.post('/resendotp',async(req,res)=>{
  try{
    const {email}=req.body;
    const user=await figmaData.findOne({email});
    const otp=Math.floor(100000+Math.random()*900000).toString();
    user.otp=otp
    await user.save();
    const mailOptions = {
      from: "prathamcd003@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.json({ status: "error", message: "Email sending failed" });
      }
    });
    res.json({ status: "ok", message: "otp resend" });

  }
  catch(error){

  }
})

app.post('/passchange',async(req,res)=>{
  try{
    const {email,password} = req.body;
    const user=await figmaData.findOne({email});
    if(!user){
      return res.json({message:"Email not found" });
    }
    if(!(password.length > 5 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password))){
      return res.json({ status: "error", message: "Password must contain uppercase, lowercase, symbol and minimum length 6" })
    }
    user.password = password;
    user.otp = null;
    await user.save();
    return res.json({ status: "ok", message: "Password updated successfully" });
  }
  catch(error){
    res.json({message:'error in changig password'})
  }
})
app.listen(1290, () => {
  console.log('Backend running on port 1290');
});
