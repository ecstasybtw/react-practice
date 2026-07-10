import { useEffect } from 'react'
import ProductGrid from '../../components/ui/ProductGrid/ProductGrid'
import { useProductsStore } from '../../store/productsStore'
import styles from './CatalogPage.module.css'

function CatalogPage() {
  const products = useProductsStore((state) => state.products)
  const isLoading = useProductsStore((state) => state.isLoading)
  const error = useProductsStore((state) => state.error)
  const loadProducts = useProductsStore((state) => state.loadProducts)

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleAddToCart = (productId: number) => {
    console.log(`Добавить товар ${productId} в корзину`)
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Каталог</h1>

      {isLoading && <p className={styles.message}>Загрузка товаров...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!isLoading && !error && (
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      )}
    </main>
  )
}

export default CatalogPage
