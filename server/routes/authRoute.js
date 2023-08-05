import express from "express";
import { registerController, loginController, testController, forgotPasswordController } from '../controllers/authController.js'
import { isAdmin, isUser, requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router()

//routing
//register m"ethod post
router.post("/register", registerController)
router.post("/login", loginController)

//forgot password route
router.post("/forgot-password", forgotPasswordController)


//test
router.get('/test', requireSignIn, isAdmin, testController)


//protected route auth 

router.get('/user-auth', requireSignIn, isUser, (req, res) => {
    res.status(200).send({ ok: true });
})


router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})


export default router;