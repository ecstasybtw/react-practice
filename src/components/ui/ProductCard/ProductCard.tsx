import { Link } from 'react-router-dom'
import type { Product } from '../../../api/productsApi'
import Button from '../Button/Button'
import styles from './ProductCard.module.css'

type Props = {
  product: Product
  onAddToCart?: (productId: number) => void
  onDeleteProduct?: (productId: number) => void
  isDeleting?: boolean
}

function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`
}

function ProductCard({
  product,
  onAddToCart,
  onDeleteProduct,
  isDeleting = false,
}: Props) {
  const handleAddToCart = () => {
    onAddToCart?.(product.id)
  }

  const handleDeleteProduct = () => {
    onDeleteProduct?.(product.id)
  }

  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={`/products/${product.id}`}>
        <img className={styles.image} src={product.image} alt={product.title} />
      </Link>

      <div className={styles.content}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.title}>
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>{formatPrice(product.price)}</p>

        <Button
          disabled={!product.inStock}
          type="button"
          onClick={handleAddToCart}
        >
          {product.inStock ? 'В корзину' : 'Нет в наличии'}
        </Button>

        {onDeleteProduct && (
          <Button
            disabled={isDeleting}
            variant="danger"
            type="button"
            onClick={handleDeleteProduct}
          >
            {isDeleting ? 'Удаление...' : 'Удалить товар'}
          </Button>
        )}
      </div>
    </article>
  )
}

export default ProductCard
