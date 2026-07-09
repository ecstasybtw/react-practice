import { Link } from 'react-router-dom'
import styles from '../../App.module.css'

function HomePage() {
  return (
    <main className={`${styles.page} ${styles['home-page']}`}>
      <h1>Главная</h1>
      <nav className={styles['home-page__links']}>
        <Link className={styles['page-link']} to="/register">
          Регистрация
        </Link>
        <Link className={styles['page-link']} to="/login">
          Вход
        </Link>
      </nav>
    </main>
  )
}

export default HomePage
