import { create } from 'zustand'

type NotificationType = 'success' | 'error'

type Notification = {
  id: number
  message: string
  type: NotificationType
}

type NotificationState = {
  notification: Notification | null
  showNotification: (message: string, type: NotificationType) => void
  hideNotification: () => void
}

export const useNotificationStore = create<NotificationState>()((set) => ({
  notification: null,
  showNotification: (message, type) => {
    set({
      notification: {
        id: Date.now(),
        message,
        type,
      },
    })
  },
  hideNotification: () => {
    set({ notification: null })
  },
}))
