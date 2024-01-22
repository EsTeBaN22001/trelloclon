import { Router } from 'express'
import { verifyToken } from '../Middlewares/jwt.js'
import { sanitizeNewBoard } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { getUserBoards, createBoard } from '../Controllers/board.controller.js'

const router = Router()

router.get('/', verifyToken, getUserBoards)
router.post('/', verifyToken, sanitizeNewBoard, validateInputs, createBoard)

export default router
