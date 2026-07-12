import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../api/productsApi'

type CartState = {
  items: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: number) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addProduct: (product) => {
        set((state) => {
          const isAlreadyInCart = state.items.some((item) => item.id === product.id)

          if (isAlreadyInCart) {
            return state
          }

          return {
            items: [...state.items, product],
          }
        })
      },
      removeProduct: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }))
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
)
