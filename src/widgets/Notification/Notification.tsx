import { useEffect } from 'react'
import { useNotificationStore } from '../../store/notificationStore'
import styles from './Notification.module.css'

function Notification() {
  const notification = useNotificationStore((state) => state.notification)
  const hideNotification = useNotificationStore((state) => state.hideNotification)

  useEffect(() => {
    if (!notification) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      hideNotification()
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [hideNotification, notification])

  if (!notification) {
    return null
  }

  return (
    <div
      className={`${styles.notification} ${styles[notification.type]}`}
      role="status"
    >
      {notification.message}
    </div>
  )
}

export default Notification
