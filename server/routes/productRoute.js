import express from 'express';
import { createProductController, allProductController, singleProductController, productPhotoController, updateProductController, deleteproductController } from "../controllers/productController.js"
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable'

const router = express.Router()

//routes
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)
router.get("/all-product", allProductController)
router.get("/single-product/:slug", singleProductController)
router.get("/product-photo/:pid", productPhotoController)
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteproductController)
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)



export default router;