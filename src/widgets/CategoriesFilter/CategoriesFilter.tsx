import type { Category } from '../../api/categoriesApi'
import styles from './CategoriesFilter.module.css'

export const ALL_CATEGORIES = 'all'

type Props = {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

function CategoriesFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <aside className={styles.filter} aria-label="Фильтр по категориям">
      <h2 className={styles.title}>Категории</h2>

      <div className={styles.list}>
        <button
          className={`${styles.button} ${
            selectedCategory === ALL_CATEGORIES ? styles.active : ''
          }`}
          type="button"
          onClick={() => onSelectCategory(ALL_CATEGORIES)}
        >
          Все товары
        </button>

        {categories.map((category) => (
          <button
            className={`${styles.button} ${
              selectedCategory === category.name ? styles.active : ''
            }`}
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.name)}
          >
            {category.title}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default CategoriesFilter
