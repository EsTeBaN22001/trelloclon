import { Router } from 'express'
import {
  sanitizeEmailInput,
  sanitizeLoginUser,
  sanitizeRegisterUser,
  sanitizeChangePassword
} from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import { changePassword, isAvailable, loginController, recovery, registerController } from '../Controllers/auth.controller.js'

const router = Router()

router.post('/register', sanitizeRegisterUser, validateInputs, registerController)
router.post('/login', sanitizeLoginUser, validateInputs, loginController)
router.post('/is-available', sanitizeEmailInput, validateInputs, isAvailable)
router.post('/recovery', sanitizeEmailInput, validateInputs, recovery)
router.post('/change-password', sanitizeChangePassword, validateInputs, changePassword)

export default router
