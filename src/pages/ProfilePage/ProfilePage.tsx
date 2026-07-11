import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import { useAuthStore } from '../../store/authStore'
import styles from '../../App.module.css'

function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className={`${styles.page} ${styles['profile-page']}`}>
      <section className={styles['profile-card']}>
        <h1>Личный кабинет</h1>
        {user && (
          <div className={styles['profile-info']}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        )}
        <Button variant="secondary" type="button" onClick={handleLogout}>
          Выйти
        </Button>
      </section>
    </main>
  )
}

export default ProfilePage
