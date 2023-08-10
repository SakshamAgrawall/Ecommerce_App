import express from "express";
import { registerController, getOrderController, orderStatusController, getAllOrderController, loginController, UpdateProfileController, testController, forgotPasswordController } from '../controllers/authController.js'
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

router.put('/profile', requireSignIn, isUser, UpdateProfileController)

//orders
router.get('/orders', requireSignIn, isUser, getOrderController)
router.get('/all-orders', requireSignIn, isAdmin, getAllOrderController)
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;