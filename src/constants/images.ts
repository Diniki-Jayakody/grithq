/** Centralized image imports — components should not scatter asset paths */

import landingBg from '@/assets/landing/grithq.jpg'
import founderPhoto from '@/assets/founder/Mangala_Photo_3.jpeg'
import asayaSandsImg from '@/assets/projects/asaya_sands.jpg'
import asayaSummitImg from '@/assets/projects/asaya_summit.jpg'
import grithqProjectImg from '@/assets/projects/grithq.jpg'
import southBeachImg from '@/assets/projects/south_beach.jpg'
import southBeach2Img from '@/assets/projects/south_beach_2.jpg'
import volunteer1 from '@/assets/volunteer/volunteer_1.jpg'
import volunteer2 from '@/assets/volunteer/volunteer_2.jpg'
import volunteer3 from '@/assets/volunteer/volunteer_3.jpg'
import volunteer4 from '@/assets/volunteer/volunteer_4.jpg'
import heroArchitecture from '@/assets/hero.png'
import gritLogo from '@/assets/logo/gritlogo.png'

export const images = {
  landing: landingBg,
  gritLogo,
  founder: founderPhoto,
  heroArchitecture,
  projects: {
    asayaSands: asayaSandsImg,
    asayaSummit: asayaSummitImg,
    grithq: grithqProjectImg,
    southBeach: southBeachImg,
    southBeach2: southBeach2Img,
  },
  volunteer: {
    one: volunteer1,
    two: volunteer2,
    three: volunteer3,
    four: volunteer4,
  },
} as const

/** Portfolio gallery sets — hero + supporting images per project */
export const portfolioImages = {
  asayaSands: {
    hero: images.projects.asayaSands,
    gallery: [images.projects.asayaSands, images.projects.asayaSummit, images.projects.southBeach],
  },
  asayaSummit: {
    hero: images.projects.asayaSummit,
    gallery: [images.projects.asayaSummit, images.projects.asayaSands, images.projects.grithq],
  },
  grithq: {
    hero: images.projects.grithq,
    gallery: [images.projects.grithq, images.projects.asayaSummit, images.projects.southBeach2],
  },
  southBeach: {
    hero: images.projects.southBeach,
    gallery: [images.projects.southBeach, images.projects.southBeach2, images.projects.asayaSands],
  },
} as const

/** @deprecated Use `images` — kept for gradual migration */
export const heroImages = {
  atmospheric: images.landing,
  architecture: images.heroArchitecture,
  skyline: images.landing,
} as const

export const developmentImages = {
  coastal: images.projects.southBeach,
  urban: images.projects.grithq,
  hospitality: images.projects.asayaSummit,
  residential: images.projects.asayaSands,
  commercial: images.projects.grithq,
  landscape: images.projects.southBeach2,
} as const

export const impactImages = {
  feeding: images.volunteer.one,
  children: images.volunteer.two,
  community: images.volunteer.three,
  volunteers: images.volunteer.four,
  school: images.volunteer.two,
  meals: images.volunteer.one,
  portrait1: images.volunteer.three,
  portrait2: images.volunteer.four,
  documentary1: images.volunteer.one,
  documentary2: images.volunteer.two,
  warm: images.volunteer.three,
} as const

export const leadershipImages = {
  chairman: images.founder,
} as const

export const philosophyImages = [
  images.projects.southBeach2,
  images.projects.grithq,
  images.projects.asayaSummit,
  images.projects.asayaSands,
] as const
