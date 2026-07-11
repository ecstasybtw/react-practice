import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button'
import { useAuthStore } from '../../store/authStore'
import styles from '../../App.module.css'

function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  const avatarLetter = user?.name.slice(0, 1).toUpperCase() ?? 'U'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className={`${styles.page} ${styles['profile-page']}`}>
      <section className={styles['profile-card']}>
        <h1>Личный кабинет</h1>
        {user && (
          <div className={styles['profile-layout']}>
            <section className={styles['profile-hero']}>
              <div className={styles['profile-avatar']} aria-hidden="true">
                {avatarLetter}
              </div>
              <div>
                <p className={styles['profile-name']}>{user.name}</p>
                <p className={styles['profile-muted']}>Фото профиля</p>
              </div>
            </section>

            <section className={styles['profile-section']}>
              <h2>Личная информация</h2>
              <div className={styles['profile-info-grid']}>
                <div>
                  <span>Имя</span>
                  <p>{user.name}</p>
                </div>
                <div>
                  <span>Email</span>
                  <p>{user.email}</p>
                </div>
                <div>
                  <span>Роль</span>
                  <p>{user.role ?? 'user'}</p>
                </div>
              </div>
            </section>

            <section className={styles['profile-section']}>
              <h2>Локация</h2>
              <p className={styles['profile-location']}>
                {user.location ?? 'Локация не указана'}
              </p>
            </section>

            <div className={styles['profile-actions']}>
              <Button variant="secondary" type="button" onClick={handleLogout}>
                Выйти
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}

export default ProfilePage
