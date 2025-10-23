import { Router } from 'express'
import { getResearchAPI } from '../../controllers/researchController.mjs'

const router = Router()

// /research - колекція досліджень
router
	.route('/')
	.get(getResearchAPI) // GET /research - список досліджень

export default router