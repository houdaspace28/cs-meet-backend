import prisma from "../db.js";
import { comparePasswords, createJwtToken, hashPassword } from "../modules/auth.js";


export const createNewUser = async (req,res) =>{
    try{
        const existingUser = await prisma.user.findUnique({
            where:{email:req.body.email}
        })

        if(existingUser){
            res.status(400).send({message:'Email already registered'})
            return
        }

        const user = await prisma.user.create({
            data:{
                username: req.body.username,
                email: req.body.email,
                password: await hashPassword(req.body.password)
            }
        })
        
        const token = createJwtToken(user)
        res.status(201).send({ user, token });
    }catch(e){
        console.log(e)
        res.status(500).send({ message: 'Internal server error' });
    }
}

export const login = async (req,res) => {
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user){
            res.status(401)
            res.send({message:'User not found'})
            return
        }

        if(!await comparePasswords(password,user.password)){
            res.status(401)
            res.send({message:'Incorrect password'})
            return
        }

        const token = createJwtToken(user)
        const sentUser = {
            id: user.id,
            username: user.username,
            email: user.email
        }
        res.send({token, user: sentUser})
        
    }catch(e){
        console.log(e)
        res.status(500).send({ message: 'Internal server error' });
    }
}

export const getCurrentUser = async (req,res) => {
    try{
        const user = req.user
        res.send(user)
    }catch(e){
        console.log(e)
        res.status(500).send({ message: 'Internal server error' });
    }
}