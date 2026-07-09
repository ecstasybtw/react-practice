import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger'

type Props = {
  text: string
  variant?: BadgeVariant
}

function Badge({ text, variant = 'default' }: Props) {
  return (
    <span className={`${styles.badge} ${styles[`badge--${variant}`]}`}>
      {text}
    </span>
  )
}

export default Badge
