import type { ReactNode } from 'react'
import { useState } from 'react'
import Button from '../Button/Button'
import styles from './Modal.module.css'

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
        <div className={styles.modal__overlay} onClick={closeModal}>
          <div
            aria-modal="true"
            className={styles.modal}
            role="dialog"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modal__header}>
              <h3 className={styles.modal__title}>{title}</h3>
              <button
                aria-label="Закрыть окно"
                className={styles.modal__close}
                type="button"
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            <div className={styles.modal__content}>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
