import type { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

type Props = {
  children: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

function Button({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
}: Props) {
  return (
    <button
      className={`${styles.button} ${styles[`button--${variant}`]}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
