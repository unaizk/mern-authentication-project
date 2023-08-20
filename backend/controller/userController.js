import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";



// ========================desc - Auth user/set token========================
//========================route - POST api/users/auth========================
//========================access- public========================
const authUser = asyncHandler( async(req,res)=>{
    res.status(200).json({message:"Auth user"})
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
    res.status(200).json({message:"Logout user"})
});

// ========================desc - Get user profile========================
//========================route - GET api/users/profile========================
//========================access- private========================
const getUserProfile = asyncHandler( async(req,res)=>{
    res.status(200).json({message:"User profile"})
});

// ========================desc - Update user profile========================
//========================route - PUT api/users/profile========================
//========================access- private========================
const updateUserProfile = asyncHandler( async(req,res)=>{
    res.status(200).json({message:"Update user profile"})
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile

}



