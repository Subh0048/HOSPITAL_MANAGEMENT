import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/errormiddleware.js";
import { message } from "../models/message.models.js";
import{User} from "../models/userschema.js"



export const userregister = catchasyncerror(async(req,res,next)=>{
    const { firstName, lastName, email, phone, nic, dob, gender, password ,role} =
    req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password||
        !role
      ) {
        return next(new ErrorHandler("Please Fill Full Form once !", 400));
      }
      // let user = User.findOne({ email })
      //  if(user){
      //   return next(new ErrorHandler("user already registered", 400));

      //  }
       let user = await User.create({firstName, lastName, email, phone, nic, dob, gender, password,role})
      res.status(200).json({
        success:true,
        message:"user registered"

      })
})
