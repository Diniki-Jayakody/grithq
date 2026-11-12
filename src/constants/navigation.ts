import type { NavItem } from '@/constants/data'
import { STRINGS } from '@/constants/strings'

export const navItems: NavItem[] = [
  { id: 'identity', label: 'Identity', href: '#identity', number: '01' },
  { id: 'investor-for', label: 'Portfolio', href: '#investor-for', number: '02' },
  { id: 'impact', label: 'Impact', href: '#impact', number: '03' },
]

export const tagline = STRINGS.brand.tagline
