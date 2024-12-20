import { Router } from 'express'
import { createList, deleteList, getListsByBoardId, updateListPosition } from '../Controllers/list.controller.js'
import { verifyToken } from '../Middlewares/jwt.js'
import { sanitizeNewList } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'

const router = Router()

router.get('/:boardId', verifyToken, getListsByBoardId)
router.post('/', verifyToken, sanitizeNewList, validateInputs, createList)
router.patch('/', verifyToken, updateListPosition)
router.delete('/:listId', verifyToken, deleteList)

export default router
