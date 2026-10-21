/* Centralized routes and external links */

export const ROUTES = {
  home: '/',
  identity: '/#identity',
  leadership: '/#leadership',
  investorFor: '/#investor-for',
  portfolio: '/#portfolio',
  project: (slug: string) => `/portfolio/${slug}`,
  messageFromMangala: '/message-from-mangala',
  grithqOpportunity: '/grithq-opportunity',
} as const

export const EXTERNAL_LINKS = {
  grithqPhotoDrive:
    'https://drive.google.com/drive/folders/1EdrdHzB7gsF7-r1dUql675puhQxWLmcI?usp=share_link',

  investedProjects: {
    Dossiers: 'https://www.dossiers.wiki',
    FlashHealth: 'https://flash.health',
    MagicUnbound: 'https://www.magicunbound.co',
    Rootstone: 'https://rootstone.io',
    Viridian: 'https://viridian.fund/',
  },

  satkara: {
    calcey: 'https://calcey.com/satkara/',
    karu: 'https://www.karunalanka.org/',
  },

  karunaTrust: 'https://www.karunalanka.org/',

  asayaSands: 'https://asaya.lk/',
  asayaSummitVideo: 'https://www.youtube.com/watch?v=e7kw97DSM6Y',
  grithqMap: 'https://maps.app.goo.gl/rn2m3xMSUspSxbqA9',
  mangalaLinkedIn: 'https://www.linkedin.com/in/mangala',
} as const