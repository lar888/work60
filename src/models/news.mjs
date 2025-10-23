import { cloneInitialNews } from "../data/db_news.mjs"

// Внутрішній стан новин (інMemory сторедж)
let news = cloneInitialNews()

// Функція для отримання всіх новин
export const getAllNews = () => {
  return [...news]
}