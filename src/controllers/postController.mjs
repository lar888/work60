import {
	getAllPosts,
	getPostById,
	addPost,
	replacePost,
	patchPost,
	deletePost,
	getNextId,
} from '../models/posts.mjs'
import * as logger from '../utils/logger.mjs'

// API: Отримання списку постів (JSON)
export const getPostsAPI = (req, res) => {
	try {
		logger.log('API: Отримання списку постів')
		const list = getAllPosts()
		res.status(200).json({
			success: true,
			data: list,
			count: list.length
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні списку постів:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Отримання одного посту за ID (JSON)
export const getPostAPI = (req, res) => {
	try {
		const { id } = req.params
		const post = getPostById(id)

		if (!post) {
			logger.log(`API: Пост з ID ${id} не знайдено`)
			return res.status(404).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		logger.log(`API: Отримання посту з ID ${id}`)
		res.status(200).json({
			success: true,
			data: post
		})
	} catch (error) {
		logger.error('API: Помилка при отриманні посту:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Створення нового посту (JSON)
export const createPostAPI = (req, res) => {
	try {
		logger.log('API: Створення нового посту')

		const post = {
			id: getNextId(),
			...req.validatedPost
		}

		addPost(post)
		logger.log('API: Пост успішно створено', post)
		res.status(201).json({
			success: true,
			data: post,
			message: 'Пост успішно створено'
		})
	} catch (error) {
		logger.error('API: Помилка при створенні посту:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Оновлення посту (JSON)
export const updatePostAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Часткове оновлення посту (PATCH) з ID ${id}`)

		const updatedPost = patchPost(id, req.validatedPostUpdates)

		if (!updatedPost) {
			logger.log(`API: Пост з ID ${id} не знайдено для оновлення`)
			return res.status(404).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		logger.log('API: Пост успішно оновлено', updatedPost)
		res.status(200).json({
			success: true,
			data: updatedPost,
			message: 'Пост успішно оновлено'
		})
	} catch (error) {
		logger.error('API: Помилка при оновленні посту:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Видалення посту (JSON)
export const deletePostAPI = (req, res) => {
	try {
		const { id } = req.params
		logger.log(`API: Видалення посту з ID ${id}`)

		const deletedPost = deletePost(id)

		if (!deletedPost) {
			logger.log(`API: Пост з ID ${id} не знайдено для видалення`)
			return res.status(404).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		logger.log('API: Пост успішно видалено', deletedPost)
		res.status(200).json({
			success: true,
			data: deletedPost,
			message: 'Пост успішно видалено'
		})
	} catch (error) {
		logger.error('API: Помилка при видаленні посту:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}

// API: Повне оновлення посту (PUT)
export const replacePostAPI = (req, res) => {
	try {
		const { id } = req.params
		const newPostData = req.validatedPost

		logger.log(`API: Повна заміна посту (PUT) з ID ${id}`)

		const replacedPost = replacePost(id, newPostData)

		if (!replacedPost) {
			logger.log(`API: Пост з ID ${id} не знайдено для заміни`)
			return res.status(404).json({
				success: false,
				error: 'Пост не знайдено'
			})
		}

		logger.log('API: Пост успішно оновлено (PUT)', replacedPost)
		res.status(200).json({
			success: true,
			data: replacedPost,
			message: 'Пост успішно оновлено'
		})
	} catch (error) {
		logger.error('API: Помилка при PUT оновленні посту:', error)
		res.status(500).json({
			success: false,
			error: 'Внутрішня помилка сервера'
		})
	}
}