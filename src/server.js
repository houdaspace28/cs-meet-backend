import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {protect} from './modules/auth.js'
import {createNewUser,login} from './handlers/authHandlers.js'
import userRouter from './routers/userRouter.js'

const app  = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.use('/signup',createNewUser)
app.use('/login',login)
app.use('/user',protect,userRouter)


export default app