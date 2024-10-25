import { Router } from 'express'
import { sanitizeNewCard } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { createCard } from '../Controllers/card.controller.js'

const router = Router()

router.post('/', sanitizeNewCard, validateInputs, createCard)

export default router
