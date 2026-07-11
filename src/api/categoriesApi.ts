const CATEGORIES_API_URL = '/api/categories'

export type Category = {
  id: number
  name: string
  title: string
}

export class CategoriesApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'CategoriesApiError'
    this.status = status
  }
}

export async function getCategories() {
  const response = await fetch(CATEGORIES_API_URL)

  if (!response.ok) {
    throw new CategoriesApiError('Не удалось загрузить категории', response.status)
  }

  return (await response.json()) as Category[]
}
