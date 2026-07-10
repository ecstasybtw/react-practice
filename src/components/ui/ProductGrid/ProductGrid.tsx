import ProductCard from '../ProductCard/ProductCard'
import type { Product } from '../ProductCard/ProductCard'
import styles from './ProductGrid.module.css'

type Props = {
  products: Product[]
  onAddToCart?: (productId: number) => void
}

function ProductGrid({ products, onAddToCart }: Props) {
  if (products.length === 0) {
    return <p className={styles.empty}>Товары не найдены</p>
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid
