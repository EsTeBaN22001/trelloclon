import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import path from 'path'
import { fileURLToPath } from 'url'

import authRoutes from './Routes/auth.routes.js'
import boardRoutes from './Routes/board.routes.js'
import listRoutes from './Routes/list.routes.js'
import cardRoutes from './Routes/card.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const app = express()

// Middleware para servir los archivos estáticos del frontend
const frontendPath = path.join(__dirname, '../../', 'frontend/dist/trelloclon-frontend')
app.use(express.static(frontendPath))

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/cards', cardRoutes)

app.use('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'))
})
