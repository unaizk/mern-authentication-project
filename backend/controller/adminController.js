import asyncHandler from "express-async-handler";
import Admin from "../models/adminModel.js"
import generateTokenAdmin from "../utils/generateTokenAdmin.js";
import { fetchAllUsers } from "../helpers/adminHelpers.js";


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
    const {name,email,password,key} = req.body

    const adminExist = await Admin.findOne({email});

    if(adminExist){
        res.status(400);
        throw new Error('Admin already exisit')
    }
    console.log(key,'keyyyyyyyyyy')
    if(key!== process.env.ADMIN_KEY){
        res.status(401);
        throw new Error('Invalid Key')
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




// ========================desc - Get admin profile========================
//========================route - GET api/admin/profile========================
//========================access- private========================
const getAdminProfile = asyncHandler( async(req,res)=>{
    const admin = {
        id:req.admin._id,
        name:req.admin.name,
        email:req.admin.email
    }
    res.status(200).json(admin)
});


// ========================desc - Update admin profile========================
//========================route - PUT api/admin/profile========================
//========================access- private========================
const updateAdminProfile = asyncHandler( async(req,res)=>{
    const admin = await Admin.findById(req.admin._id);

    if(admin){
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        if(req.body.password){
            admin.password = req.body.password;
        }
    
        const updatedAdmin = await admin.save();
    
        res.status(200).json({
            _id : updatedAdmin._id,
            name : updatedAdmin.name,
            email : updatedAdmin.email
        })
    }else{
        res.status(404);
        throw new Error('Admin not found')
    }

    
});


// ========================desc - list user details========================
//========================route - GET api/admin/usersList========================
//========================access- private========================

const getAllUsers = asyncHandler(async (req,res) => {
    fetchAllUsers()
      .then((users) => {
        res.status(200).json({users}); 
      })
      .catch((error) => {
        console.log(error);
      });
  })


export {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllUsers
}