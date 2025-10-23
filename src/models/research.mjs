import { cloneInitialResearch } from "../data/db_research.mjs"

// Внутрішній стан досліджень (інMemory сторедж)
let research = cloneInitialResearch()

// Функція для отримання всіх досліджень
export const getAllResearch = () => {
	return [...research]
}