import { Link, useLocation, useNavigate } from 'react-router-dom'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'

interface PageBackLinkProps {
  fallback: string
  variant?: 'light' | 'dark'
}

export function PageBackLink({ fallback, variant = 'dark' }: PageBackLinkProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLight = variant === 'light'

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.key === 'default') return
    event.preventDefault()
    navigate(-1)
  }

  return (
    <Link
      to={fallback}
      onClick={handleClick}
      className={`${styles.pageBackLink} ${
        isLight
          ? 'text-grithq-burgundy/70 hover:text-grithq-burgundy focus-visible:ring-offset-grithq-offwhite'
          : 'text-grithq-cream/60 hover:text-grithq-offwhite focus-visible:ring-offset-grithq-black'
      }`}
    >
      {STRINGS.common.back}
    </Link>
  )
}
