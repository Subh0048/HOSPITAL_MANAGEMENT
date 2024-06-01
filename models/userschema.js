import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userschema = Schema({
  firstName: {
    type: String,
    required: true,

    minlength: [3, "first name must contaion 3 letter "],
  },
  lastName: {
    type: String,
    required: true,

    minlength: [3, "last name must contain 3 letter"],
  },
  email: {
    type: String,
    required:true,
    validate: [validator.isEmail, "enter a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "phone number must contain 10 number"],
    maxlength: [10, "phone number must contain 10 number"],
  },
  nic: {
    type: String,
    required: true,
    minlength: [10, "NIC  exact contain 13 number character"],
    maxlength: [10, "NIC must contain 13 number character"],
  },
  dob: {
    type:String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "student"],
  },
  doctordepartment: {
    type: String,
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  },
});

userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userschema.methods.passwordcompare = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};
userschema.methods.generatejsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userschema);
