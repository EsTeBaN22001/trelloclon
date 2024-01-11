import { Router } from 'express'
import { sanitizeRegisterUser } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { registerController } from '../Controllers/auth.controller.js'

const router = Router()

router.post('/register', sanitizeRegisterUser, validateInputs, registerController)

export default router
