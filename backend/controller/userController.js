import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";



// ========================desc - Auth user/set token========================
//========================route - POST api/users/auth========================
//========================access- public========================
const authUser = asyncHandler( async(req,res)=>{
    const {email,password}= req.body;

    const user = await User.findOne({email});

   

    

    if(user && (await user.matchPaswword(password))){
        generateToken(res,user._id)
        const responseData = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

          if (user.imagePath) {
            responseData.imagePath = user.imagePath;
        }

        res.status(201).json(responseData);
    }else{
        res.status(400);
        throw new Error('invalid email or password')
    }


});


// ========================desc - Register a new user========================
//========================route - POST api/users========================
//========================access- public========================
const registerUser = asyncHandler( async(req,res)=>{
    const {name,email,password} = req.body

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(400);
        throw new Error('User already exisit')
    }



    const user = await User.create({
        name,
        email,
        password
    })

    

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
    
});

// ========================desc - Logout user========================
//========================route - POST api/users/logout========================
//========================access- public========================
const logoutUser = asyncHandler( async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Logged out"})
});

// ========================desc - Get user profile========================
//========================route - GET api/users/profile========================
//========================access- private========================
const getUserProfile = asyncHandler( async(req,res)=>{
    const user = {
        id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user)
});

// ========================desc - Update user profile========================
//========================route - PUT api/users/profile========================
//========================access- private========================
const updateUserProfile = asyncHandler( async(req,res)=>{
   
    const user = await User.findById(req.user._id);
    
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.file){
            user.imagePath = req.file.filename || user.imagePath;
           }

        if(req.body.password){
            user.password = req.body.password;
        }
    
        const updatedUser = await user.save();
    
        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
            image:updatedUser.imagePath
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }

    
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

}



