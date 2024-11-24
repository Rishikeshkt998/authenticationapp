


const jwt=require("jsonwebtoken")


function signJwt(payload){
    const jwttoken=process.env.JWT_SECRET_KEY
    if(!jwttoken){
        throw Error("secret key not found")
    }
    const token=jwt.sign(payload,jwttoken,{expiresIn:"1d"})
    return token
}

function verifyJwt(token){
    const secretKey=process.env.JWT_SECRET_KEY
    if(!secretKey){
        throw new Error("secret key is not found")
    }
    try{
        const decoded=jwt.verify(token,secretKey)
        return decoded

    }catch(error){
        throw new Error("invalid token or token expired")
    }
}

module.exports={signJwt,verifyJwt}

