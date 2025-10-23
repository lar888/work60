import { getAllNews } from "../models/news.mjs"
import * as logger from '../utils/logger.mjs'

// API: Отримання списку новин (JSON)
export const getNewsAPI = (req, res) => {
    try {
        logger.log('API: Отримання списку новин')
        const list = getAllNews()
        res.status(200).json({
            success: true,
            data: list,
            count: list.length
        })
    } catch (error) {
        logger.error('API: Помилка при отриманні списку новин:', error)
        res.status(500).json({
            success: false,
            error: 'Внутрішня помилка сервера'
        })
    }
}