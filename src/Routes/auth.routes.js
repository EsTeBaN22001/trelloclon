import { Router } from 'express'
import { sanitizeEmailInput, sanitizeLoginUser, sanitizeRegisterUser } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { isAvailable, loginController, registerController } from '../Controllers/auth.controller.js'

const router = Router()

router.post('/register', sanitizeRegisterUser, validateInputs, registerController)
router.post('/login', sanitizeLoginUser, validateInputs, loginController)
router.post('/is-available', sanitizeEmailInput, validateInputs, isAvailable)

export default router
