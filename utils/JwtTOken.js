export const generateToken=(user,message,statusCode,res)=>{
    const token = user.generatejsonWebToken()
    const cookiename = user.role === "Admin"? "adminToken":"patientToken"
    res.status(statusCode).cookie(cookieName,token,{
        expires:new Date(Date.now()+process.env.JWT_EXPIRE)
    })

}