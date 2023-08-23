import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js"
import generateTokenAdmin from "../utils/generateTokenAdmin.js";



// ========================desc - Auth admin/set token========================
//========================route - POST api/admin/auth========================
//========================access- public========================
const authAdmin = asyncHandler( async(req,res)=>{
    const {email,password}= req.body;

    const admin = await Admin.findOne({email});

    if(admin && (await admin.matchPaswword(password))){
        generateTokenAdmin(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email
        })
    }else{
        res.status(400);
        throw new Error('invalid email or password')
    }


});


// ========================desc - Register a new admin========================
//========================route - POST api/admin========================
//========================access- public========================
const registerAdmin = asyncHandler( async(req,res)=>{
    const {name,email,password} = req.body

    const adminExist = await Admin.findOne({email});

    if(adminExist){
        res.status(400);
        throw new Error('Admin already exisit')
    }

    const admin = await Admin.create({
        name,
        email,
        password
    })

    

    if(admin){
        generateTokenAdmin(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email
        })
    }else{
        res.status(400);
        throw new Error('invalid admin data')
    }
    
});

// ========================desc - Logout admin========================
//========================route - POST api/admin/logout========================
//========================access- public========================
const logoutAdmin = asyncHandler( async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"Logged out"})
});

export {
    authAdmin,
    registerAdmin,
    logoutAdmin
}