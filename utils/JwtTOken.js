export const generateToken=(user,message,statusCode,res)=>{
    const token = user.generatejsonWebToken();
    const cookieName = user.role === "Admin"? "adminToken":"patientToken"
    res.status(statusCode).cookie(cookieName,token,{
        expires:new Date(Date.now()+ process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
    }) .json({
        success:true,
        message,
        user,
        token
    })

}