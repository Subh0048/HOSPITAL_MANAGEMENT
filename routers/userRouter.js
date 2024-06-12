import express from "express"
import { login,userregister,NewAdmin, getalldoctor, getalluser } from "../controller/usercontroller.js";
import {isadminauthentication,ispatientauthentication} from "../middlewares/auth.js"


const router = express.Router();
router.post("/patient/register",userregister)
router.post("/login",login )
router.post("/admin/addnew",isadminauthentication,NewAdmin );
router.get("/doctors",getalldoctor)
router.get("/admin/me",isadminauthentication,getalluser );
router.get("/patient/me",ispatientauthentication,getalluser );


export default router;

