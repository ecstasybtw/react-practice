import { useState } from 'react'
import './Accordion.css'

type AccordionItem = {
  question: string
  answer: string
}

type Props = {
  items: AccordionItem[]
}

function Accordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const contentId = `accordion-content-${index}`

        return (
          <div className="accordion__item" key={item.question}>
            <button
              aria-controls={contentId}
              aria-expanded={isOpen}
              className="accordion__button"
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="accordion__icon">{isOpen ? '-' : '+'}</span>
            </button>

            {isOpen && (
              <p className="accordion__content" id={contentId}>
                {item.answer}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
