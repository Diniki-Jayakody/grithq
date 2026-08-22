/** Centralized routes and external links */

export const ROUTES = {
  home: '/',
  identity: '/#identity',
  leadership: '/#leadership',
  portfolio: '/#portfolio',
  contact: '/#contact',
  project: (slug: string) => `/portfolio/${slug}`,
  messageFromMangala: '/message-from-mangala',
  grithqOpportunity: '/grithq-opportunity',
} as const

export const EXTERNAL_LINKS = {
  grithqPhotoDrive:
    'https://drive.google.com/drive/folders/1EdrdHzB7gsF7-r1dUql675puhQxWLmcI?usp=share_link',
} as const
