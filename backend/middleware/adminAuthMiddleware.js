import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';

const adminProtect = asyncHandler(async(req,res,next)=>{
    let token = req.cookies.adminJwt;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.adminId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, invalid token')
        }
    }else{
        res.status(401);
        throw new Error('Not authorized,no token')
    }
})

export {adminProtect}