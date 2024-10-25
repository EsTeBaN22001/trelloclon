import { Router } from 'express'
import { createList, getLists } from '../Controllers/list.controller.js'
import { verifyToken } from '../Middlewares/jwt.js'
import { sanitizeNewList } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'

const router = Router()

router.get('/', verifyToken, getLists)
router.post('/', verifyToken, sanitizeNewList, validateInputs, createList)

export default router
