import './Badge.css'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

type Props = {
  text: string
  variant?: BadgeVariant
}

function Badge({ text, variant = 'default' }: Props) {
  return <span className={`badge badge--${variant}`}>{text}</span>
}

export default Badge
