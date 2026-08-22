import type { NavItem } from '@/constants/data'
import { STRINGS } from '@/constants/strings'

export const navItems: NavItem[] = [
  { id: 'identity', label: 'Identity', href: '#identity', number: '01' },
  { id: 'portfolio', label: 'Portfolio', href: '#portfolio', number: '02' },
  { id: 'developments', label: 'Developments', href: '#developments', number: '03' },
  { id: 'impact', label: 'Impact', href: '#impact', number: '04' },
  { id: 'future', label: 'Future', href: '#future', number: '05' },
  { id: 'contact', label: 'Contact', href: '#contact', number: '06' },
]

export const tagline = STRINGS.brand.tagline
