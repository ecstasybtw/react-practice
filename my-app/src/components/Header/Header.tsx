import Button from '../Button/Button'
import './Header.css'

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
    <header className="header">
      <a className="header__logo" href="#top">
        <span className="header__logo-mark">{logo.slice(0, 1)}</span>
        <span>{logo}</span>
      </a>

      <nav className="header__nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a key={item.href} className="header__link" href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Button variant="primary">{buttonText}</Button>
    </header>
  )
}

export default Header
