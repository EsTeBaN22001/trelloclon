import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import authRoutes from './Routes/auth.routes.js'
import boardRoutes from './Routes/board.routes.js'
import listRoutes from './Routes/list.routes.js'
import cardRoutes from './Routes/card.routes.js'

export const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/cards', cardRoutes)
