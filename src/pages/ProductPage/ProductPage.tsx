import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../api/productsApi'
import type { Product } from '../../api/productsApi'
import Button from '../../components/ui/Button/Button'
import { useCartStore } from '../../store/cartStore'
import styles from './ProductPage.module.css'

function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`
}

function ProductPage() {
  const { productId } = useParams()
  const productIdNumber = Number(productId)
  const isInvalidProductId =
    !Number.isInteger(productIdNumber) || productIdNumber <= 0
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const addProduct = useCartStore((state) => state.addProduct)
  const displayedError = isInvalidProductId ? 'Товар не найден' : error

  useEffect(() => {
    if (isInvalidProductId) {
      return
    }

    let isActive = true

    async function loadProduct() {
      setIsLoading(true)
      setError('')
      setProduct(null)

      try {
        const productData = await getProductById(productIdNumber)

        if (isActive) {
          setProduct(productData)
        }
      } catch {
        if (isActive) {
          setError('Не удалось загрузить товар')
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    void loadProduct()

    return () => {
      isActive = false
    }
  }, [isInvalidProductId, productIdNumber])

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} to="/catalog">
        Назад в каталог
      </Link>

      {!displayedError && isLoading && (
        <p className={styles.message}>Загрузка товара...</p>
      )}
      {displayedError && <p className={styles.error}>{displayedError}</p>}
      {!isLoading && !displayedError && product && (
        <article className={styles.product}>
          <img className={styles.image} src={product.image} alt={product.title} />

          <section className={styles.info}>
            <p className={styles.category}>{product.category}</p>
            <h1>{product.title}</h1>
            <p className={styles.price}>{formatPrice(product.price)}</p>
            <p className={styles.description}>{product.description}</p>
            <p className={styles.status}>
              {product.inStock ? 'В наличии' : 'Нет в наличии'}
            </p>
            <Button
              disabled={!product.inStock}
              type="button"
              onClick={() => addProduct(product)}
            >
              {product.inStock ? 'В корзину' : 'Нет в наличии'}
            </Button>
          </section>
        </article>
      )}
    </main>
  )
}

export default ProductPage
