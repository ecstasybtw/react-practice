import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '../api/authApi'

type AuthState = {
  accessToken: string | null
  user: AuthUser | null
  isAuthenticated: boolean
  setSession: (accessToken: string, user: AuthUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      setSession: (accessToken, user) => {
        set({
          accessToken,
          user,
          isAuthenticated: true,
        })
      },
      logout: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
