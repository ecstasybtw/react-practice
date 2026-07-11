import LoginForm from '../../widgets/Auth/LoginForm'
import styles from '../../App.module.css'

function LoginPage() {
  return (
    <main className={`${styles.page} ${styles['auth-page']}`}>
      <section className={styles['auth-card']}>
        <h1>Вход</h1>
        <LoginForm />
      </section>
    </main>
  )
}

export default LoginPage
