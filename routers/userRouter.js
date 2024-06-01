import express,{Router} from "express"
import { login,userregister } from "../controller/usercontroller.js";


const router = new Router();
router.post("/patient/register",userregister)
router.post("/login",login )


export default router

