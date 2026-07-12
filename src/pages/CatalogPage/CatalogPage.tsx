import { useEffect, useState } from 'react'
import { getCategories } from '../../api/categoriesApi'
import type { Category } from '../../api/categoriesApi'
import ProductGrid from '../../components/ui/ProductGrid/ProductGrid'
import { useCartStore } from '../../store/cartStore'
import { useProductsStore } from '../../store/productsStore'
import CategoriesFilter, {
  ALL_CATEGORIES,
} from '../../widgets/CategoriesFilter/CategoriesFilter'
import styles from './CatalogPage.module.css'

function CatalogPage() {
  const products = useProductsStore((state) => state.products)
  const isLoading = useProductsStore((state) => state.isLoading)
  const error = useProductsStore((state) => state.error)
  const loadProducts = useProductsStore((state) => state.loadProducts)
  const addProduct = useCartStore((state) => state.addProduct)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesError, setCategoriesError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)

  const filteredProducts =
    selectedCategory === ALL_CATEGORIES
      ? products
      : products.filter((product) => product.category === selectedCategory)

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  useEffect(() => {
    let isActive = true

    async function loadCategories() {
      setCategoriesError('')

      try {
        const categoriesData = await getCategories()

        if (isActive) {
          setCategories(categoriesData)
        }
      } catch {
        if (isActive) {
          setCategoriesError('Не удалось загрузить категории')
        }
      }
    }

    void loadCategories()

    return () => {
      isActive = false
    }
  }, [])

  const handleAddToCart = (productId: number) => {
    const product = products.find((product) => product.id === productId)

    if (!product) {
      console.warn(`Товар ${productId} не найден`)
      return
    }

    addProduct(product)
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог</h1>

      {isLoading && <p className={styles.message}>Загрузка товаров...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {categoriesError && <p className={styles.error}>{categoriesError}</p>}
      {!isLoading && !error && (
        <div className={styles.content}>
          <CategoriesFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        </div>
      )}
    </main>
  )
}

export default CatalogPage
