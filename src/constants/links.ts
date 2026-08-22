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
  /** Replace with the confirmed Google Drive folder URL when available */
  grithqPhotoDrive: '#',
} as const
