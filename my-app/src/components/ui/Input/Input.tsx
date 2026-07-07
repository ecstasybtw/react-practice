import { useId } from 'react'
import type { ChangeEventHandler } from 'react'
import './Input.css'

type Props = {
  label: string
  name?: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  error?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = 'text',
  autoComplete,
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
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
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
