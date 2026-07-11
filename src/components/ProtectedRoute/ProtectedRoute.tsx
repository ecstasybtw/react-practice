import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

type Props = {
  children: ReactNode
}

function ProtectedRoute({ children }: Props) {
  const accessToken = useAuthStore((state) => state.accessToken)

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
