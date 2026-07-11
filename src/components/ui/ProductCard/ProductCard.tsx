import { Link } from 'react-router-dom'
import type { Product } from '../../../api/productsApi'
import Button from '../Button/Button'
import styles from './ProductCard.module.css'

type Props = {
  product: Product
  onAddToCart?: (productId: number) => void
}

function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`
}

function ProductCard({ product, onAddToCart }: Props) {
  const handleAddToCart = () => {
    onAddToCart?.(product.id)
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
      </div>
    </article>
  )
}

export default ProductCard
