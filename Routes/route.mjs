import express from 'express';
import controller from '../Controllers/controller.mjs';

const router= express.Router();

router
.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.post("/addproduct",controller.addProduct)
.put("/updateproduct/:id",controller.updateProduct)
.delete("/deleteproduct/:id",controller.deleteProduct)
export default router; 