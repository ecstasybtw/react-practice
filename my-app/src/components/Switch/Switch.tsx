import { useState } from 'react'
import './Switch.css'

type Props = {
  label: string
  defaultChecked?: boolean
  disabled?: boolean
}

function Switch({ label, defaultChecked = false, disabled = false }: Props) {
  const [isOn, setIsOn] = useState(defaultChecked)

  return (
    <div className="switch">
      <span className="switch__label">{label}</span>
      <button
        aria-checked={isOn}
        className={`switch__control ${isOn ? 'switch__control--on' : ''}`}
        disabled={disabled}
        role="switch"
        type="button"
        onClick={() => setIsOn(!isOn)}
      >
        <span className="switch__thumb" />
      </button>
      <span className="switch__status">
        {isOn ? 'Включено' : 'Выключено'}
      </span>
    </div>
  )
}

export default Switch
