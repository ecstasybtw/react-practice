import { useState } from 'react'
import type { ReactNode } from 'react'
import './Tabs.css'

type TabItem = {
  title: string
  content: ReactNode
}

type Props = {
  tabs: TabItem[]
}

function Tabs({ tabs }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = tabs[activeIndex]

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Вкладки">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index

          return (
            <button
              aria-selected={isActive}
              className={`tabs__button ${isActive ? 'tabs__button--active' : ''}`}
              key={tab.title}
              role="tab"
              type="button"
              onClick={() => setActiveIndex(index)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>

      <div className="tabs__panel" role="tabpanel">
        {activeTab.content}
      </div>
    </div>
  )
}

export default Tabs
