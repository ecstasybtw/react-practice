const AUTH_API_URL = '/api'

export type AuthUser = {
  id: number
  email: string
  name: string
  role?: string
}

export type AuthResponse = {
  accessToken: string
  user: AuthUser
}

export type RegisterRequest = {
  name: string
  email: string
  password: string
  role?: string
}

export type LoginRequest = {
  email: string
  password: string
}

export class AuthApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AuthApiError'
    this.status = status
  }
}

async function requestAuth(path: string, body: RegisterRequest | LoginRequest) {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    const message = typeof data === 'string' ? data : 'Ошибка запроса'

    throw new AuthApiError(message, response.status)
  }

  return data as AuthResponse
}

export function registerUser(userData: RegisterRequest) {
  return requestAuth('/register', {
    ...userData,
    role: userData.role ?? 'user',
  })
}

export function loginUser(userData: LoginRequest) {
  return requestAuth('/login', userData)
}
