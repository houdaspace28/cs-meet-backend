import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {protect} from './modules/auth.js'
import {createNewUser,login,getCurrentUser} from './handlers/authHandlers.js'
import projectsRouter from './routers/projectsRouter.js'
import blogsRouter from './routers/blogsRouter.js'

const app  = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.use('/signup',createNewUser)
app.use('/login',login)
app.use('/projects', projectsRouter)
app.post('/profile/:id', async (req,res) => {
    try{
        const {username, bio} = req.body
        const user = await prisma.user.update({
            where:{id:req.params.id},
            data:{username, bio}
        })
        const sentUser = {
            id:user.id,
            username:user.username,
            bio:user.bio,
            email:user.email,
        }
        res.json(sentUser)
    }catch(error){
        res.status(500).json({message:'Error updating bio'})
    }
})


app.use('/blogs', blogsRouter)



export default app