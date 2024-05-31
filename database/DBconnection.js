import mongoose from "mongoose";

export const dbconnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_URL),{
        dbName:"HOSPITAL_MANAGEMENT_SYATEM"
    }
    console.log(" database connected successfully");
  } catch (err) {
    console.log(`ERROR IN DBCONNECTION", ${err}`);
  }
};
