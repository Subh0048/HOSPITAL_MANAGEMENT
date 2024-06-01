import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/errormiddleware.js";
import { message } from "../models/message.models.js";
import { User } from "../models/userschema.js";
import { generateToken } from "../utils/JwtTOken.js";

export const userregister = catchasyncerror(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form once !", 400));
  }
  // let user = User.findOne({ email })
  //  if(user){
  //   return next(new ErrorHandler("user already registered", 400));

  //  }
  let user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user,"user registered successfully",200,res)
});

export const login = catchasyncerror(async (req, res, next) => {
  const { email, password, confirmpassword, role } = req.body;
  if (!email || !password || !confirmpassword || !role) {
    return next(new ErrorHandler("Please Fill all details !", 400));
  }
  if (password !== confirmpassword) {
    return next(new ErrorHandler("entered confirm  password not match !", 400));
  }
  let user =  await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("invalid user,400"));
  }
  let passwordmatched =  await user.Comparepassword(password)
  if(!passwordmatched){
    return next(new ErrorHandler("invalid password", 400));

  }
   if(role !==user.role){
    return next(new ErrorHandler("user with this role not found", 400));

   }
   generateToken(user,"user loggedin successfully",200,res)
});
