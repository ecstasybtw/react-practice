import { useEffect, useState } from 'react'
import { getCategories } from '../../api/categoriesApi'
import type { Category } from '../../api/categoriesApi'
import { deleteProduct } from '../../api/productsApi'
import ProductGrid from '../../components/ui/ProductGrid/ProductGrid'
import { useAuthStore } from '../../store/authStore'
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
  const removeProduct = useProductsStore((state) => state.removeProduct)
  const accessToken = useAuthStore((state) => state.accessToken)
  const user = useAuthStore((state) => state.user)
  const addProduct = useCartStore((state) => state.addProduct)
  const removeProductFromCart = useCartStore((state) => state.removeProduct)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesError, setCategoriesError] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES)
  const [searchQuery, setSearchQuery] = useState('')
  const isAdmin = user?.role === 'admin'

  const categoryProducts =
    selectedCategory === ALL_CATEGORIES
      ? products
      : products.filter((product) => product.category === selectedCategory)
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const filteredProducts = normalizedSearchQuery
    ? categoryProducts.filter((product) => {
        const searchableText = `${product.title} ${product.description} ${product.category}`

        return searchableText.toLowerCase().includes(normalizedSearchQuery)
      })
    : categoryProducts

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

  const handleDeleteProduct = async (productId: number) => {
    if (!accessToken) {
      setDeleteError('Чтобы удалить товар, нужно войти в аккаунт')
      return
    }

    setDeleteError('')
    setDeletingProductId(productId)

    try {
      await deleteProduct(productId, accessToken)
      removeProduct(productId)
      removeProductFromCart(productId)
    } catch {
      setDeleteError('Не удалось удалить товар')
    } finally {
      setDeletingProductId(null)
    }
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог</h1>

      <label className={styles.search}>
        <span>Поиск товаров</span>
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Введите название товара"
          type="search"
        />
      </label>

      {isLoading && <p className={styles.message}>Загрузка товаров...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {categoriesError && <p className={styles.error}>{categoriesError}</p>}
      {deleteError && <p className={styles.error}>{deleteError}</p>}
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
            onDeleteProduct={isAdmin ? handleDeleteProduct : undefined}
            deletingProductId={deletingProductId}
          />
        </div>
      )}
    </main>
  )
}

export default CatalogPage
