import express,{Router} from "express"
import { userregister } from "../controller/usercontroller.js";


const router = new Router();
router.post("/patient/register",userregister)


export default router

