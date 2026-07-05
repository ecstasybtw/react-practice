import { useId } from 'react'
import './Input.css'

type Props = {
  label: string
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'password'
}

function Input({
  label,
  placeholder,
  error,
  disabled = false,
  type = 'text',
}: Props) {
  const inputId = useId()
  const errorId = `${inputId}-error`

  return (
    <div className={`input ${error ? 'input--error' : ''}`}>
      <label className="input__label" htmlFor={inputId}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="input__control"
        disabled={disabled}
        id={inputId}
        placeholder={placeholder}
        type={type}
      />
      {error && (
        <p className="input__error" id={errorId}>
          {error}
        </p>
      )}
    </div>
  )
}

export default Input
