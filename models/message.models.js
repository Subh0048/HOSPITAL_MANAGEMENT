import mongoose, { Schema } from "mongoose";
import validator from "validator";

const messageschema = Schema({
  firstname: {
    type: String,
    required: true,
    
    minlength: [3, "first name must contaion 3 letter "],
  },
  lastname: {
    type: String,
    required: true,
    
    minlength: [3, "last name must contain 3 letter"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [11, "phone number must contain 10 number"],
    maxlength: [11, "phone number must contain 10 number"],
  },
  message: {
    type: String,
    required: true,
    minlength: [11, "message  must contain 11 number character"],
  },
});

export const message = mongoose.model("message", messageschema);
