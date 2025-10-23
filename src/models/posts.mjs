import { cloneInitialPosts } from "../data/db_posts.mjs"

// Внутрішній стан постів (інMemory сторедж)
let posts = cloneInitialPosts()

// Функція для отримання поста за ID
export const getPostById = (id) => {
	return posts.find((post) => post.id === parseInt(id))
}

// Функція для отримання всіх постів
export const getAllPosts = () => {
	return [...posts]
}

// Функція для додавання нового поста
export const addPost = (post) => {
	posts.push(post)
	return post
}

// Функція для оновлення поста
export const updatePost = (id, updatedPost) => {
	const index = posts.findIndex((post) => post.id === parseInt(id))
	if (index !== -1) {
		posts[index] = { ...posts[index], ...updatedPost }
		return posts[index]
	}
	return null
}

// Функція для повної заміни поста (PUT)
export const replacePost = (id, newPostData) => {
	const index = posts.findIndex((post) => post.id === parseInt(id))
	if (index !== -1) {
		posts[index] = { ...newPostData, id: posts[index].id }
		return posts[index]
	}
	return null
}

// Функція для часткового оновлення поста (PATCH)
export const patchPost = (id, partialPostData) => {
	const index = posts.findIndex((post) => post.id === parseInt(id))
	if (index !== -1) {
		posts[index] = { ...posts[index], ...partialPostData }
		return posts[index]
	}
	return null
}

// Функція для видалення поста
export const deletePost = (id) => {
	const index = posts.findIndex((post) => post.id === parseInt(id))
	if (index !== -1) {
		return posts.splice(index, 1)[0]
	}
	return null
}

// Функція для перевірки чи існує пост з таким ID
export const postExists = (id) => {
	return posts.some((post) => post.id === parseInt(id))
}

// Функція для генерації наступного ID
export const getNextId = () => {
	return posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1
}

// Функція для валідації поста
export const validatePost = (post) => {
	if (!post) return false

	// id must be an integer and not NaN
	if (!Number.isInteger(post.id) || Number.isNaN(post.id)) return false

	// title: required non-empty string
	if (typeof post.title !== 'string' || post.title.trim() === '') return false

	// description: required non-empty string
	if (typeof post.description !== 'string' || post.description.trim() === '') return false

	// category: required non-empty string
	if (typeof post.category !== 'string' || post.category.trim() === '') return false

	// tags: must be a non-empty array of non-empty strings
	if (
		!Array.isArray(post.tags) ||
		post.tags.length === 0 ||
		!post.tags.every((tag) => typeof tag === 'string' && tag.trim() !== '')
	) return false

	// year: must be a valid positive integer
	if (!Number.isInteger(post.year) || post.year < 2015) return false

	// image: must be a valid non-empty string (URL)
	if (typeof post.image !== 'string' || post.image.trim() === '') return false

	// selected: must be a boolean
	if (typeof post.selected !== 'boolean') return false

	return true
}

export const validatePatchPost = (updates) => {
	if (!updates || typeof updates !== 'object') return false

	if (
		updates.title === undefined &&
		updates.description === undefined &&
		updates.category === undefined &&
		updates.tags === undefined &&
		updates.year === undefined &&
		updates.image === undefined &&
		updates.selected === undefined
	) {
		return false
	}

	if (updates.title !== undefined) {
		if (typeof updates.title !== 'string' || updates.title.trim() === '') return false
	}

	if (updates.description !== undefined) {
		if (typeof updates.description !== 'string' || updates.description.trim() === '') return false
	}

	if (updates.category !== undefined) {
		if (typeof updates.category !== 'string' || updates.category.trim() === '') return false
	}

	if (updates.tags !== undefined) {
		if (
			!Array.isArray(updates.tags) ||
			updates.tags.length === 0 ||
			!updates.tags.every((tag) => typeof tag === 'string' && tag.trim() !== '')
		) return false
	}

	if (updates.year !== undefined) {
		if (!Number.isInteger(updates.year) || updates.year < 2015 || updates.year > new Date().getFullYear() + 1)
			return false
	}

	if (updates.image !== undefined) {
		if (typeof updates.image !== 'string' || updates.image.trim() === '') return false
	}

	if (updates.selected !== undefined) {
		if (typeof updates.selected !== 'boolean') return false
	}

	return true
}

// Функція для валідації PUT оновлень (повна заміна)
export const validatePutPost = (post) => {
	if (!post) return false

	if (typeof post.title !== 'string' || post.title.trim() === '') return false

	if (typeof post.description !== 'string' || post.description.trim() === '') return false

	if (typeof post.category !== 'string' || post.category.trim() === '') return false

	if (
		!Array.isArray(post.tags) ||
		post.tags.length === 0 ||
		!post.tags.every((tag) => typeof tag === 'string' && tag.trim() !== '')
	) return false

	if (!Number.isInteger(post.year) || post.year <= 0) return false

	if (typeof post.image !== 'string' || post.image.trim() === '') return false

	if (typeof post.selected !== 'boolean') return false

	return true
}


// Перезапуск постів з початковими даними (для тестів)
export const resetPosts = () => {
	posts = cloneInitialPosts()
}