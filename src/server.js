import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import {createNewUser,loginUser,protect} from './modules/auth'
import userRouter from './routers/userRouter'

const app  = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))


app.use('/sigup',createNewUser)
app.use('/login',loginUser)
app.use('/user',protect,userRouter)


export default app