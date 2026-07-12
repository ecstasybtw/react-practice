import type { Product } from '../../../api/productsApi'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductGrid.module.css'

type Props = {
  products: Product[]
  onAddToCart?: (productId: number) => void
  onDeleteProduct?: (productId: number) => void
  deletingProductId?: number | null
}

function ProductGrid({
  products,
  onAddToCart,
  onDeleteProduct,
  deletingProductId = null,
}: Props) {
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
          onDeleteProduct={onDeleteProduct}
          isDeleting={deletingProductId === product.id}
        />
      ))}
    </div>
  )
}

export default ProductGrid
