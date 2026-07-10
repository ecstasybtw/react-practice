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
      <img className={styles.image} src={product.image} alt={product.title} />

      <div className={styles.content}>
        <p className={styles.category}>{product.category}</p>
        <h3 className={styles.title}>{product.title}</h3>
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
