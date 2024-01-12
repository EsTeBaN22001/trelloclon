import { Router } from 'express'
import { sanitizeLoginUser, sanitizeRegisterUser } from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { loginController, registerController } from '../Controllers/auth.controller.js'

const router = Router()

router.post('/register', sanitizeRegisterUser, validateInputs, registerController)
router.post('/login', sanitizeLoginUser, validateInputs, loginController)

export default router
