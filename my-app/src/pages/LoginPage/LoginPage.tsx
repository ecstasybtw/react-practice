import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <main className="page auth-page">
      <section className="auth-card">
        <h1>Вход</h1>
        <p className="auth-card__footer">
          <Link to="/register">Зарегистрироваться</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
