import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthApiError, registerUser } from '../../api/authApi'
import Button from '../../components/ui/Button/Button'
import Input from '../../components/ui/Input/Input'
import styles from './AuthForm.module.css'

type RegisterFormState = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterErrors = Partial<Record<keyof RegisterFormState, string>>

const initialForm: RegisterFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateRegisterForm(form: RegisterFormState) {
  const errors: RegisterErrors = {}

  if (!form.name.trim()) {
    errors.name = 'Введите имя'
  }

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

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Повторите пароль'
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Пароли не совпадают'
  }

  return errors
}

function RegisterForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<RegisterErrors>({})
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange =
    (field: keyof RegisterFormState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
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

    const validationErrors = validateRegisterForm(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await registerUser({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })
      navigate('/login')
    } catch (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        setServerError('Пользователь с таким email уже существует')
      } else {
        setServerError('Не удалось зарегистрироваться')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Имя"
          name="name"
          value={form.name}
          onChange={handleChange('name')}
          error={errors.name}
          placeholder="Анна Иванова"
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <Input
          label="Повтор пароля"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          placeholder="Повторите пароль"
          type="password"
          autoComplete="new-password"
        />

        {serverError && <p className={styles.error}>{serverError}</p>}

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </form>

      <p className={styles.footer}>
        <Link to="/login">Войти</Link>
      </p>
    </>
  )
}

export default RegisterForm
