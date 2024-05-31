import {message} from "../models/message.models.js";

export const sendmessage = async (req, res, next) => {
  const { firstname, lastname, email, phone, message: messageContent } = req.body;
  if (!firstname || !lastname || !email || !phone || !messageContent) {
    return res.status(400).json({
      success: false,
      message: "please fill all details"
    });
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
};
