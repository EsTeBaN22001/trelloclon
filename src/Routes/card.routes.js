import { Router } from 'express'
import { sanitizeNewCard } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { getCardsByListId, createCard, updateCard, deleteCard } from '../Controllers/card.controller.js'
import { verifyToken } from '../Middlewares/jwt.js'

const router = Router()

router.get('/:listId', verifyToken, getCardsByListId)
router.post('/', verifyToken, sanitizeNewCard, validateInputs, createCard)
router.patch('/:cardId', verifyToken, updateCard)
router.delete('/:cardId', verifyToken, deleteCard)

export default router
