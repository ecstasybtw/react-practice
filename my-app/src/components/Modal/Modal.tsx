import type { ReactNode } from 'react'
import { useState } from 'react'
import Button from '../Button/Button'
import './Modal.css'

type Props = {
  buttonText: string
  title: string
  children: ReactNode
}

function Modal({ buttonText, title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
      <Button variant="primary" onClick={openModal}>
        {buttonText}
      </Button>

      {isOpen && (
        <div className="modal__overlay" onClick={closeModal}>
          <div
            aria-modal="true"
            className="modal"
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal__header">
              <h3 className="modal__title">{title}</h3>
              <button
                aria-label="Закрыть окно"
                className="modal__close"
                type="button"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className="modal__content">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
