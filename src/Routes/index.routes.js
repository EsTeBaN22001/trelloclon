import { Router } from 'express'
import { indexController } from '../Controllers/index.controller.js'

const router = Router()

router.get('/', indexController)

export default router
