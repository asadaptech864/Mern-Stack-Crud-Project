import express from 'express';
import controller from '../Controllers/controller.mjs';
import UserController from '../Controllers/userConroller.mjs';
import EmailController from '../Controllers/SendEmail.mjs';
import VerificationEmailController from '../Controllers/emailverfication.mjs';
import verifyoptController from '../Controllers/verifyopt.mjs';
import { upload } from '../cloudinaryconfig.mjs';

const router= express.Router();

router
.get("/verify-opt",verifyoptController. verifyOTP)
.get("/Send-Email",EmailController.sendEmail)
.get("/verificationEmail",VerificationEmailController.sendVerificationEmail)
.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.post("/addproduct",controller.addProduct)
.post("/addproductwithimage", upload.single('image'), controller.addProductwithimage)
.put("/updateproduct/:id",controller.updateProduct)
.delete("/deleteproduct/:id",controller.deleteProduct)
// user routes
.post("/addUser", UserController.addUser)
.post("/userlogin", UserController.LoginUser)
export default router; 