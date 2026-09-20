/** Centralized image imports. Components should not scatter asset paths. */

import landingBg from '@/assets/landing/grithq.jpg'
import founderPhoto from '@/assets/founder/Mangala_Photo_3.jpeg'
import asayaSandsLegacyImg from '@/assets/projects/asaya_sands.jpg'
import asayaSummitLegacyImg from '@/assets/projects/asaya_summit.jpg'
import grithqProjectLegacyImg from '@/assets/projects/grithq.jpg'
import southBeachLegacyImg from '@/assets/projects/south_beach.jpg'
import southBeach2LegacyImg from '@/assets/projects/south_beach_2.jpg'
import asayaSandsMainImg from '@/assets/projects/asaya_sands/asaya_sands_main.jpg'
import asayaSands1Img from '@/assets/projects/asaya_sands/asaya_sands_1.webp'
import asayaSands2Img from '@/assets/projects/asaya_sands/asaya_sands_2.webp'
import asayaSands3Img from '@/assets/projects/asaya_sands/asaya_sands_3.webp'
import asayaSands4Img from '@/assets/projects/asaya_sands/asaya_sands_4.jpg'
import asayaSandsWork1Img from '@/assets/projects/asaya_sands/asaya_sands_work_1.jpg'
import asayaSandsWork2Img from '@/assets/projects/asaya_sands/asaya_sands_work_2.jpeg'
import asayaSandsWork3Img from '@/assets/projects/asaya_sands/asaya_sands_work_3.jpg'
import asayaSummitMainImg from '@/assets/projects/asaya_summit/asaya_summit_main.jpg'
import asayaSummit1Img from '@/assets/projects/asaya_summit/asaya_summit_1.jpg'
import asayaSummit2Img from '@/assets/projects/asaya_summit/asaya_summit_2.jpg'
import asayaSummit3Img from '@/assets/projects/asaya_summit/asaya_summit_3.jpg'
import asayaSummitYogaImg from '@/assets/projects/asaya_summit/asaya_summit_yoga.jpg'
import grithqMainImg from '@/assets/projects/gritHQ/grithq_main.jpg'
import southBeachMainImg from '@/assets/projects/south_beach/south_beach_main.jpg'
import southBeach1Img from '@/assets/projects/south_beach/south_beach_1.jpg'
import volunteer1 from '@/assets/volunteer/volunteer_1.jpg'
import volunteer2 from '@/assets/volunteer/volunteer_2.jpg'
import volunteer3 from '@/assets/volunteer/volunteer_3.jpg'
import volunteer4 from '@/assets/volunteer/volunteer_4.jpg'
import volunteer5 from '@/assets/volunteer/volunteer_5.jpg'
import heroArchitecture from '@/assets/hero.png'
import gritLogo from '@/assets/logo/gritlogo.png'
import identityQuoteImg from '@/assets/identity/quote-image.jpg'
import focusRealEstateImg from '@/assets/investment-focus/real-estate.jpg'
import focusHospitalityImg from '@/assets/investment-focus/hospitality.jpg'
import focusBusinessesImg from '@/assets/investment-focus/businesses.webp'
import focusStrategicImg from '@/assets/investment-focus/strategic-investment.jpg'
import flashHealthImg from '@/assets/projects/invested-projects/flashHealth.png'
import dossiersImg from '@/assets/projects/invested-projects/Dossiers.png'
import rootstoneImg from '@/assets/projects/invested-projects/Rootstone.png'
import magicUnboundImg from '@/assets/projects/invested-projects/MagicUnbound.png'

export const images = {
  landing: landingBg,
  gritLogo,
  founder: founderPhoto,
  heroArchitecture,
  projects: {
    asayaSands: asayaSandsLegacyImg,
    asayaSummit: asayaSummitLegacyImg,
    grithq: grithqProjectLegacyImg,
    southBeach: southBeachLegacyImg,
    southBeach2: southBeach2LegacyImg,
  },
  volunteer: {
    one: volunteer1,
    two: volunteer2,
    three: volunteer3,
    four: volunteer4,
    five: volunteer5,
  },
  identity: {
    editorial: identityQuoteImg,
  },
  investmentFocus: {
    realEstate: focusRealEstateImg,
    hospitality: focusHospitalityImg,
    businesses: focusBusinessesImg,
    selective: focusStrategicImg,
  },
  invested: {
    flashHealth: flashHealthImg,
    dossiers: dossiersImg,
    rootstone: rootstoneImg,
    magicUnbound: magicUnboundImg,
  },
} as const

export const projectAssets = {
  asayaSands: {
    main: asayaSandsMainImg,
    gallery: [
      asayaSands1Img,
      asayaSands2Img,
      asayaSands3Img,
      asayaSands4Img,
      asayaSandsWork1Img,
      asayaSandsWork2Img,
      asayaSandsWork3Img,
    ],
  },
  asayaSummit: {
    main: asayaSummitMainImg,
    gallery: [
      asayaSummit1Img,
      asayaSummit2Img,
      asayaSummit3Img,
      asayaSummitYogaImg,
    ],
  },
  grithq: {
    main: grithqMainImg,
    gallery: [] as readonly string[],
  },
  southBeach: {
    main: southBeachMainImg,
    gallery: [southBeach1Img],
  },
} as const

/** Portfolio gallery sets: main/cover image plus remaining images from each project folder. */
export const portfolioImages = {
  asayaSands: {
    hero: projectAssets.asayaSands.main,
    gallery: [...projectAssets.asayaSands.gallery],
  },
  asayaSummit: {
    hero: projectAssets.asayaSummit.main,
    gallery: [...projectAssets.asayaSummit.gallery],
  },
  grithq: {
    hero: projectAssets.grithq.main,
    gallery: [...projectAssets.grithq.gallery],
  },
  southBeach: {
    hero: projectAssets.southBeach.main,
    gallery: [...projectAssets.southBeach.gallery],
  },
} as const

/** @deprecated Use `images`. Kept for gradual migration. */
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
  warm: images.volunteer.five,
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
