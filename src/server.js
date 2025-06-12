import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {protect} from './modules/auth.js'
import {createNewUser,login} from './handlers/authHandlers.js'
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
app.use('/blogs', blogsRouter)



export default app