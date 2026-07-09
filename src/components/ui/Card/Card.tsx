import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import styles from './Card.module.css'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

type Props = {
  image: string
  title: string
  description: string
  badgeText: string
  buttonText: string
  badgeVariant?: BadgeVariant
  onButtonClick?: () => void
}

function Card({
  image,
  title,
  description,
  badgeText,
  buttonText,
  badgeVariant = 'default',
  onButtonClick,
}: Props) {
  return (
    <article className={styles.card}>
      <img className={styles.card__image} src={image} alt="" />
      <div className={styles.card__content}>
        <Badge text={badgeText} variant={badgeVariant} />
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__description}>{description}</p>
        <Button variant="primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </article>
  )
}

export default Card
