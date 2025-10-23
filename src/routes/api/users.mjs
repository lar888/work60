import { Router } from 'express'
import { getUsersAPI } from '../../controllers/usersController.mjs'

const router = Router()

// /users - колекція членів команди
router
	.route('/')
	.get(getUsersAPI) // GET /users - список членів команди

export default router