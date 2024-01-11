import { Router } from 'express'
import { body } from 'express-validator'
import requestValidator from './../middlewares/requestValidator.js'
import * as controller from './../controllers/sessionController.js'

const router = Router()

router.get('/find/:id', controller.find)

router.post('/add', body('id').notEmpty(), requestValidator, controller.add)

router.delete('/delete/:id', controller.del)

router.post('/check', body('id').notEmpty(), requestValidator, controller.check)

export default router
