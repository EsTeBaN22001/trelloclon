import { Router } from 'express'
import { verifyToken } from '../Middlewares/jwt.js'
import { sanitizeNewBoard, sanitizeUpdateBoard } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { getMeBoards, getBoard, createBoard, deleteBoard, updateBoard } from '../Controllers/board.controller.js'

const router = Router()

router.get('/me', verifyToken, getMeBoards)
router.get('/:boardId', verifyToken, getBoard)
router.post('/', verifyToken, sanitizeNewBoard, validateInputs, createBoard)
router.patch('/:boardId', verifyToken, sanitizeUpdateBoard, validateInputs, updateBoard)
router.delete('/:boardId', verifyToken, deleteBoard)

export default router
