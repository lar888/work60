import express from 'express'
import cors from 'cors'
import apiRouter from './routes/api/index.mjs'
import webRouter from './routes/web/index.mjs'
import { expressErrorHandler, setupGlobalErrorHandlers } from './middleware/errorHandlers.mjs'

const PORT = 3000
const app = express()

// Налаштування глобальних обробників помилок
setupGlobalErrorHandlers()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))


// Middleware for JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', apiRouter) // JSON API endpoints
app.use('/', webRouter) // HTML Web Interface

// 404 Handler: JSON для API, EJS для Web
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'API endpoint not found',
      path: req.originalUrl
    })
  }
  // HTML 404 для Web
  logger.log(`Сторінку не знайдено: ${req.originalUrl}`)
  res.status(404).render('404')
})

// Express error middleware (має бути ПІСЛЯ всіх роутів)
app.use(expressErrorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
