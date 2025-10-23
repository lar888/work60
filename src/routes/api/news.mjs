import { Router } from 'express'
import { getNewsAPI } from '../../controllers/newsController.mjs'

const router = Router()

// /news - колекція продуктів
router
	.route('/')
	.get(getNewsAPI) // GET /news - список постів

export default router