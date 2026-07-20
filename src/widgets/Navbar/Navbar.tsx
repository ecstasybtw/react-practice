import { NavLink } from 'react-router-dom'
import { useThemeStore } from '../../store/themeStore'
import styles from './Navbar.module.css'

function Navbar() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <NavLink className={styles.logo} to="/">
          Store
        </NavLink>

        <nav className={styles.links} aria-label="Основная навигация">
          <button
            aria-label={
              theme === 'light' ? 'Включить темную тему' : 'Включить светлую тему'
            }
            className={styles.themeButton}
            title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            to="/catalog"
          >
            Каталог
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            to="/cart"
          >
            Корзина
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            to="/profile"
          >
            Личный кабинет
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
