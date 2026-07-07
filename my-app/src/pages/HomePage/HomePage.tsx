import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <main className="page home-page">
      <h1>Главная</h1>
      <nav className="home-page__links">
        <Link className="page-link" to="/register">
          Регистрация
        </Link>
        <Link className="page-link" to="/login">
          Вход
        </Link>
      </nav>
    </main>
  )
}

export default HomePage
