import express from 'express';
import controller from '../Controllers/controller.mjs';
import UserController from '../Controllers/userConroller.mjs';
import EmailController from '../Controllers/SendEmail.mjs';
import VerificationEmailController from '../Controllers/emailverfication.mjs';
import verifyoptController from '../Controllers/verifyopt.mjs';

const router= express.Router();

router
.get("/verify-opt",verifyoptController. verifyOTP)
.get("/Send-Email",EmailController.sendEmail)
.get("/verificationEmail",VerificationEmailController.sendVerificationEmail)
.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.post("/addproduct",controller.addProduct)
.put("/updateproduct/:id",controller.updateProduct)
.delete("/deleteproduct/:id",controller.deleteProduct)
// user routes
.post("/addUser", UserController.addUser)
export default router; 