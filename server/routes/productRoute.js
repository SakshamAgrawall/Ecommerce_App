import express from 'express';
import { createProductController, productListController, searchProductController, productCountController, filtersProductController, allProductController, singleProductController, productPhotoController, updateProductController, deleteproductController, categoryProductController } from "../controllers/productController.js"
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js"
import formidable from 'express-formidable'

const router = express.Router()

//routes
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)
router.get("/all-product", allProductController)
router.get("/single-product/:slug", singleProductController)
router.post("/filters-product", filtersProductController)
router.get("/product-photo/:pid", productPhotoController)
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteproductController)
router.put("/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController)
router.get('/count-product', productCountController);
router.get('/list-product/:page', productListController);
router.get('/search-product/:keyword', searchProductController);
router.get('/category-product/:slug', categoryProductController);


export default router;