import { create } from 'zustand'
import { getProducts } from '../api/productsApi'
import type { Product } from '../api/productsApi'

type ProductsState = {
  products: Product[]
  isLoading: boolean
  error: string
  loadProducts: () => Promise<void>
  removeProduct: (productId: number) => void
}

export const useProductsStore = create<ProductsState>()((set) => ({
  products: [],
  isLoading: false,
  error: '',
  loadProducts: async () => {
    set({ isLoading: true, error: '' })

    try {
      const products = await getProducts()

      set({ products })
    } catch {
      set({ error: 'Не удалось загрузить товары' })
    } finally {
      set({ isLoading: false })
    }
  },
  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }))
  },
}))
