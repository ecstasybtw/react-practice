import { useId } from 'react'
import styles from './Select.module.css'

type SelectOption = {
  value: string
  label: string
}

type Props = {
  label: string
  options: SelectOption[]
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

function Select({
  label,
  options,
  disabled = false,
  value,
  onChange,
}: Props) {
  const selectId = useId()

  return (
    <div className={styles.select}>
      <label className={styles.select__label} htmlFor={selectId}>
        {label}
      </label>
      <select
        className={styles.select__control}
        disabled={disabled}
        id={selectId}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
