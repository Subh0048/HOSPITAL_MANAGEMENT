import {message} from "../models/message.models.js";
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/errormiddleware.js";

export const sendmessage =catchasyncerror( async (req, res, next) => {
  const { firstname, lastname, email, phone, message: messageContent } = req.body;
  if (!firstname || !lastname || !email || !phone || !messageContent) {
    return next(new ErrorHandler("please fill the form ",400))
  }
  try {
    await message.create({ firstname, lastname, email, phone, message: messageContent });
    res.status(200).json({
      success: true,
      message: "message sent successfully"
    });
  } catch (error) {
    next(error);
  }
})
