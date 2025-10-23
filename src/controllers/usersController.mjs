import { getAllUsers } from "../models/users.mjs"
import * as logger from '../utils/logger.mjs'

// API: Отримання списку членів команди (JSON)
export const getUsersAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку членів команди')
		const list = getAllUsers()
		res.status(200).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку членів команди:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}