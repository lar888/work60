import { cloneInitialUsers } from "../data/db_users.mjs"

// Внутрішній стан членів команди (інMemory сторедж)
let users = cloneInitialUsers()

// Функція для отримання всіх членів команди
export const getAllUsers = () => {
  return [...users]
}