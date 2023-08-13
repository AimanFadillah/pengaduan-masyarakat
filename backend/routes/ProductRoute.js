import express from "express";
import {
    saveKategoriProduct,
    getProducts,
    getProductById,
    saveProduct,
    updateProduct,
    deleteProduct
} from "../controller/ProductController.js"

const router = express.Router();

router.get("/product",getProducts)
router.get("/",saveKategoriProduct)
router.get("/product/:id",getProductById)
router.post("/product",saveProduct)
router.patch("/product/:id",updateProduct)
router.delete("/product/:id",deleteProduct)

export default router; 