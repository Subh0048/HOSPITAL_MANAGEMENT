import { catchasyncerror } from "./catchasyncerror.js";
import ErrorHandler from "./errormiddleware.js";
import { User } from "../models/userschema.js";
import jwt from "jsonwebtoken";


export const isadminauthentication = catchasyncerror(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        next( new ErrorHandler("admin not authenticated",400));

    }
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY )
    req.user= await User.findById(decode.id);
    if(req.user.role !=="Admin"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorizwd for perform this operation`,403
            )
        )
    }


next()
})
export const ispatientauthentication = catchasyncerror(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        next( new ErrorHandler("patient not authenticated",400));

    }
    const decode = jwt.verify(token,process.env.JWT_SECRET_KEY )
    req.user= await User.findById(decode.id);
    if(req.user.role !=="patient"){
        return next(
            new ErrorHandler(
                `${req.user.role} not authorizwd for perform this operation`,403
            )
        )
    }


next()
})

