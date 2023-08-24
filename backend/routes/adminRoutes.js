const router = express.Router();
import express from "express";

import {authAdmin,registerAdmin,logoutAdmin,getAdminProfile,updateAdminProfile,getAllUsers,updateUserData} from "../controller/adminController.js";
import { adminProtect } from "../middleware/adminAuthMiddleware.js";


router.post('/',registerAdmin)

router.post('/auth',authAdmin)

router.post('/logout',logoutAdmin)

router.route('/profile').get(adminProtect,getAdminProfile).put(adminProtect,updateAdminProfile)

router.get('/usersList',getAllUsers)

router.put('/update-user', updateUserData);

export default router;
