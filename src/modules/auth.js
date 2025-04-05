import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createJwtToken = (user) => {
    const token = jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
    return token
}

export const hashPassword = (password) => {
    return bcrypt.hash(password,10)
}

export const comparePasswords = (password,hash) => {
    return bcrypt.compare(password,hash)
}



export const protect = async (req,res,next) =>{
   const bearer  = req.header.authorization

   if(!bearer){
    res.status(401)
    res.send({message: 'Unauthorized'})
    return 
   }

   const [,token] = bearer.split(' ')

   if(!token){
     res.status(401)
     res.send({message: 'Unauthorized'})
   }

   try{
     const user = jwt.verify(token,process.env.JWT_SECRET)
     req.user = user
     next()
   }catch(e){
    console.log(e)
    res.status(401)
    res.send({message:'Invalid token'})
    return
   }
}