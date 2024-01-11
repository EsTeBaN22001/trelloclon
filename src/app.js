import express from 'express'
import morgan from 'morgan'
import indexRoutes from './Routes/index.routes.js'
import authRoutes from './Routes/auth.routes.js'

export const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(indexRoutes)
app.use('/auth', authRoutes)
