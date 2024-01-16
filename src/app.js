import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRoutes from './Routes/index.routes.js'
import authRoutes from './Routes/auth.routes.js'

export const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(indexRoutes)
app.use('/api/auth', authRoutes)
