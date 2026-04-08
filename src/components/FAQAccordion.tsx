import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type FAQItem = {
  answer: string
  question: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isActive = index === activeIndex

        return (
          <div key={item.question} className={['glass-card', 'faq-item', isActive ? 'is-open' : ''].join(' ')}>
            <button
              className="faq-trigger"
              onClick={() => setActiveIndex(isActive ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <ChevronDown className={isActive ? 'is-rotated' : ''} size={18} />
            </button>
            <div className="faq-answer">{isActive ? <p>{item.answer}</p> : null}</div>
          </div>
        )
      })}
    </div>
  )
}
