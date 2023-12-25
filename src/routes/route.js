const express= require('express');
const router=express.Router();
const userController=require("../controllers/userController");

router.post("/user/create",userController.createUser);
router.get("/user/getUser",userController.getUser);

module.exports=router