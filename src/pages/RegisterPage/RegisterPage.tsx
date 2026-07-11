import RegisterForm from '../../widgets/Auth/RegisterForm'
import styles from '../../App.module.css'

function RegisterPage() {
  return (
    <main className={`${styles.page} ${styles['auth-page']}`}>
      <section className={styles['auth-card']}>
        <h1>Регистрация</h1>
        <RegisterForm />
      </section>
    </main>
  )
}

export default RegisterPage
