import Badge from '../Badge/Badge'
import Button from '../Button/Button'
import './Card.css'

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
    <article className="card">
      <img className="card__image" src={image} alt="" />
      <div className="card__content">
        <Badge text={badgeText} variant={badgeVariant} />
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <Button variant="primary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </article>
  )
}

export default Card
