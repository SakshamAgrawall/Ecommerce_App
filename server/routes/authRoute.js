import express from "express";
import {registerController,loginController,testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router()

//routing
//register m"ethod post
router.post("/register", registerController)
router.post("/login", loginController)


//test
router.get('/test',requireSignIn,isAdmin,testController)


export default router;