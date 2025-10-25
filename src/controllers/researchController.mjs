import { HTTP_STATUS } from "../config/http.mjs"
import { getAllResearch } from "../models/research.mjs"
import * as logger from '../utils/logger.mjs'

// API: Отримання списку досліджень (JSON)
export const getResearchAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку досліджень')
		const list = getAllResearch()
		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку досліджень:', error)
		res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}