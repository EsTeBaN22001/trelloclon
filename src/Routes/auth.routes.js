import { Router } from 'express'
import { verifyToken } from '../Middlewares/jwt.js'
import {
  sanitizeEmailInput,
  sanitizeLoginUser,
  sanitizeRegisterUser,
  sanitizeChangePassword
} from '../Middlewares/sanitizeInputs.js'
import { validateInputs } from '../Middlewares/validateInput.js'
import {
  changePassword,
  isAvailable,
  loginController,
  profile,
  recovery,
  registerController
} from '../Controllers/auth.controller.js'

const router = Router()

router.post('/register', sanitizeRegisterUser, validateInputs, registerController)
router.post('/login', sanitizeLoginUser, validateInputs, loginController)
router.post('/is-available', sanitizeEmailInput, validateInputs, isAvailable)

router.post('/recovery', verifyToken, sanitizeEmailInput, validateInputs, recovery)
router.post('/change-password', verifyToken, sanitizeChangePassword, validateInputs, changePassword)
router.get('/profile', verifyToken, profile)

export default router
