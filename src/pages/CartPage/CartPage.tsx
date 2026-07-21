import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import { useCartStore } from '../../store/cartStore'
import { useNotificationStore } from '../../store/notificationStore'
import styles from './CartPage.module.css'

function formatPrice(price: number) {
  return `${price.toLocaleString('ru-RU')} ₽`
}

function CartPage() {
  const items = useCartStore((state) => state.items)
  const removeProduct = useCartStore((state) => state.removeProduct)
  const showNotification = useNotificationStore((state) => state.showNotification)
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0)

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId)
    showNotification('Товар удален из корзины', 'error')
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Корзина</h1>

      {items.length === 0 && (
        <section className={styles.empty}>
          <p>Корзина пуста</p>
          <Link to="/catalog">Перейти в каталог</Link>
        </section>
      )}

      {items.length > 0 && (
        <div className={styles.layout}>
          <section className={styles.list} aria-label="Товары в корзине">
            {items.map((item) => (
              <article className={styles.item} key={item.id}>
                <img className={styles.image} src={item.image} alt={item.title} />

                <div className={styles.info}>
                  <p className={styles.category}>{item.category}</p>
                  <h2>
                    <Link to={`/products/${item.id}`}>{item.title}</Link>
                  </h2>
                  <p className={styles.price}>{formatPrice(item.price)}</p>
                </div>

                <Button
                  variant="danger"
                  type="button"
                  onClick={() => handleRemoveProduct(item.id)}
                >
                  Удалить
                </Button>
              </article>
            ))}
          </section>

          <aside className={styles.summary}>
            <h2>Итого</h2>
            <p className={styles.total}>{formatPrice(totalPrice)}</p>
            <Button type="button">Перейти к оплате</Button>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage
