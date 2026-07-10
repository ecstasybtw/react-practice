const PRODUCTS_API_URL = '/api/products'

export type Product = {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
  inStock: boolean
}

export class ProductsApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ProductsApiError'
    this.status = status
  }
}

async function requestProducts<T>(path = '') {
  const response = await fetch(`${PRODUCTS_API_URL}${path}`)

  if (!response.ok) {
    throw new ProductsApiError('Не удалось загрузить товары', response.status)
  }

  return (await response.json()) as T
}

export function getProducts() {
  return requestProducts<Product[]>()
}

export function getProductById(productId: number) {
  return requestProducts<Product>(`/${productId}`)
}
