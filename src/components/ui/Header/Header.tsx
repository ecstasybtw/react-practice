import Button from '../Button/Button'
import styles from './Header.module.css'

type NavItem = {
  label: string
  href: string
}

type Props = {
  logo: string
  navItems: NavItem[]
  buttonText: string
}

function Header({ logo, navItems, buttonText }: Props) {
  return (
    <header className={styles.header}>
      <a className={styles.header__logo} href="#top">
        <span className={styles['header__logo-mark']}>{logo.slice(0, 1)}</span>
        <span>{logo}</span>
      </a>

      <nav className={styles.header__nav} aria-label="Основная навигация">
        {navItems.map((item) => (
          <a key={item.href} className={styles.header__link} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Button variant="primary">{buttonText}</Button>
    </header>
  )
}

export default Header
