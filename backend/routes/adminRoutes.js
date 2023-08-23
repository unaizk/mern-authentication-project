const router = express.Router();
import express from "express";

import {authAdmin,registerAdmin,logoutAdmin} from "../controller/adminController.js";
import { protect } from "../middleware/authMiddleware.js";


router.post('/',registerAdmin)

router.post('/auth',authAdmin)

router.post('/logout',logoutAdmin)


export default router;
