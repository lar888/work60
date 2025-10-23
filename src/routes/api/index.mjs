import { Router } from 'express'
import postsRouter from './posts.mjs'
import newsRouter from './news.mjs'
import researchRouter from './research.mjs'
import usersRouter from './users.mjs'

const api = Router()

// API routes
api.use('/posts', postsRouter)
api.use('/news', newsRouter)
api.use('/research', researchRouter)
api.use('/users', usersRouter)

// Middleware для 404 у API (JSON відповідь)
api.use((req, res) => {
	res.status(404).json({
		success: false,
		error: 'API endpoint not found',
		path: req.originalUrl
	})
})

export default api
