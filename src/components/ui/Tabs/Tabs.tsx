import { useState } from 'react'
import type { ReactNode } from 'react'
import styles from './Tabs.module.css'

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
    <div className={styles.tabs}>
      <div className={styles.tabs__list} role="tablist" aria-label="Вкладки">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index

          return (
            <button
              aria-selected={isActive}
              className={`${styles.tabs__button} ${isActive ? styles['tabs__button--active'] : ''}`}
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

      <div className={styles.tabs__panel} role="tabpanel">
        {activeTab.content}
      </div>
    </div>
  )
}

export default Tabs
