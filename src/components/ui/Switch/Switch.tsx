import { useState } from 'react'
import styles from './Switch.module.css'

type Props = {
  label: string
  defaultChecked?: boolean
  disabled?: boolean
}

function Switch({ label, defaultChecked = false, disabled = false }: Props) {
  const [isOn, setIsOn] = useState(defaultChecked)

  return (
    <div className={styles.switch}>
      <span className={styles.switch__label}>{label}</span>
      <button
        aria-checked={isOn}
        className={`${styles.switch__control} ${isOn ? styles['switch__control--on'] : ''}`}
        disabled={disabled}
        role="switch"
        type="button"
        onClick={() => setIsOn(!isOn)}
      >
        <span className={styles.switch__thumb} />
      </button>
      <span className={styles.switch__status}>
        {isOn ? 'Включено' : 'Выключено'}
      </span>
    </div>
  )
}

export default Switch
