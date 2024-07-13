import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const {email,password}=req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Password is incorrect"})
        }
        const token = createToken(user._id);
        res.json({success:true,token});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});

    }
}

//token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

//register user

const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "user already exist" })
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter a valid email" })

        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        //encrypt the password byusing bcrypt
        //hashing
        //range is from 5 to 15
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //first name yaani  ki usermodel ka name equal to registeruser 
        //ka name from req.body
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        //save user in database
        const user = await newUser.save();

        //generating token by using createtoken function

        const token = createToken(user._id);
        res.json({ success: true, token });



    } catch (error) {
        console.log(error);
        res.json({ success: tfalse, message: "Error" });
    }
}

export { loginUser, registerUser };