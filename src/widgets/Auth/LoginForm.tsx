import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthApiError, loginUser } from '../../api/authApi'
import Button from '../../components/ui/Button/Button'
import Input from '../../components/ui/Input/Input'
import { useAuthStore } from '../../store/authStore'
import styles from './AuthForm.module.css'

type LoginFormState = {
  email: string
  password: string
}

type LoginErrors = Partial<Record<keyof LoginFormState, string>>

const initialForm: LoginFormState = {
  email: '',
  password: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateLoginForm(form: LoginFormState) {
  const errors: LoginErrors = {}

  if (!form.email.trim()) {
    errors.email = 'Введите email'
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Введите корректный email'
  }

  if (!form.password) {
    errors.password = 'Введите пароль'
  } else if (form.password.length < 6) {
    errors.password = 'Пароль должен быть минимум 6 символов'
  }

  return errors
}

function LoginForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const setSession = useAuthStore((state) => state.setSession)
  const navigate = useNavigate()

  const handleChange =
    (field: keyof LoginFormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [field]: event.target.value,
      }))
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }))
      setServerError('')
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError('')

    const validationErrors = validateLoginForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      const authResponse = await loginUser({
        email: form.email.trim(),
        password: form.password,
      })

      setSession(authResponse.accessToken, authResponse.user)
      navigate('/profile')
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        setServerError('Неверный email или пароль')
      } else {
        setServerError('Не удалось войти')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
          placeholder="name@example.com"
          type="email"
          autoComplete="email"
        />
        <Input
          label="Пароль"
          name="password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
          placeholder="Минимум 6 символов"
          type="password"
          autoComplete="current-password"
        />

        {serverError && <p className={styles.error}>{serverError}</p>}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <p className={styles.footer}>
        <Link to="/register">Зарегистрироваться</Link>
      </p>
    </>
  )
}

export default LoginForm
