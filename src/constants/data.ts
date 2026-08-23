import { portfolioImages, developmentImages, impactImages, images } from '@/constants/images'
import { STRINGS } from '@/constants/strings'
import { ROUTES, EXTERNAL_LINKS } from '@/constants/links'

// ─── Navigation ─────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  href: string
  number: string
}

// ─── Leadership ───────────────────────────────────────────────────────────────

export interface LeadershipProfile {
  id: string
  name: string
  nameDisplay: string
  role: string
  description: string
  image: string
}

export const leadershipProfiles: LeadershipProfile[] = [
  {
    id: 'founder',
    name: STRINGS.leadership.name,
    nameDisplay: STRINGS.leadership.nameDisplay,
    role: STRINGS.leadership.role,
    description: STRINGS.leadership.description,
    image: images.founder,
  },
]

export interface LeadershipCredential {
  id: string
  role: string
  organization: string
  organizationLine2?: string
}

export const leadershipCredentials: LeadershipCredential[] = STRINGS.leadership.credentials.map(
  (item) => ({
    id: item.id,
    role: item.role,
    organization: item.organization,
    organizationLine2: 'organizationLine2' in item ? item.organizationLine2 : undefined,
  })
)

export const leadershipMessage = {
  route: ROUTES.messageFromMangala,
  backHref: ROUTES.leadership,
  year: '2026',
  paragraphs: [
    'GritHQ was formed around a simple conviction: capital is most useful when it is patient, responsible and directed toward assets that can compound in value over time.',
    'We look for opportunities where ownership is an act of stewardship — where buildings, businesses and partnerships can be strengthened rather than merely transacted. Long-term thinking is not a slogan for us. It is the standard by which every decision is weighed.',
    'Responsible investment, in our view, means aligning capital with people and places that can endure. We prefer partnerships built on clarity, discipline and shared ambition. Sustainable value is created when those conditions are present — and protected when they are not.',
    'The years ahead will ask us to remain selective. Opportunity will continue to appear. Our task is to meet it with the same composure that has shaped GritHQ thus far: vision without haste, growth without dilution, and a future that is built rather than assumed.',
  ],
} as const

// ─── Investment Focus ─────────────────────────────────────────────────────────

export interface InvestmentFocusArea {
  id: string
  number: string
  title: string
  description: string
  image: string
}

export const investmentFocusAreas: InvestmentFocusArea[] = [
  {
    id: 'real-estate',
    number: '01',
    title: 'REAL ESTATE',
    description:
      'Strategic properties and developments positioned for long-term value creation.',
    image: images.investmentFocus.realEstate,
  },
  {
    id: 'hospitality',
    number: '02',
    title: 'HOSPITALITY & EXPERIENCES',
    description:
      'Destination-led investments focused on distinctive places and experiences.',
    image: images.investmentFocus.hospitality,
  },
  {
    id: 'operating-businesses',
    number: '03',
    title: 'OPERATING BUSINESSES',
    description:
      'Businesses with strong fundamentals and potential for sustainable growth.',
    image: images.investmentFocus.businesses,
  },
  {
    id: 'selective-opportunities',
    number: '04',
    title: 'SELECTIVE OPPORTUNITIES',
    description:
      'High-conviction opportunities where strong fundamentals and strategic potential align.',
    image: images.investmentFocus.selective,
  },
]

// ─── Portfolio / Projects ───────────────────────────────────────────────────

export interface ProjectDeal {
  types: readonly ('Sale' | 'Rent')[]
  route: string
}

export interface Project {
  id: string
  slug: string
  name: string
  category: string
  location: string
  status: string
  developmentType: string
  shortDescription: string
  description: string
  overview: string[]
  vision: string
  heroImage: string
  gallery: readonly string[]
  featured: boolean
  year: string
  emphasis?: 'primary' | 'standard'
  deal?: ProjectDeal
  valueStatement?: string
}

export const projects: Project[] = [
  {
    id: 'asaya-sands',
    slug: 'asaya-sands',
    name: 'Asaya Sands',
    category: 'Hospitality / Real Estate',
    location: 'Southern Coast, Sri Lanka',
    status: 'In Development',
    developmentType: 'Destination Resort',
    shortDescription:
      'A destination-led asset shaped around landscape, hospitality and long-term value creation.',
    description:
      'Asaya Sands represents a vision for destination-led hospitality — where natural landscape, architectural restraint and guest experience converge into a lasting asset.',
    overview: [
      'Conceived as a premium coastal destination, Asaya Sands integrates resort hospitality with thoughtfully scaled development across a dramatic natural setting.',
      'The project prioritises landscape preservation, local materiality and experiential design — creating a place that feels both luxurious and grounded.',
      'As a portfolio asset, Asaya Sands reflects GRITHQ\'s approach to hospitality investments with long-term ownership horizons.',
    ],
    vision:
      'To create a destination that outlasts trends — where every architectural decision serves both guest experience and generational asset value.',
    heroImage: portfolioImages.asayaSands.hero,
    gallery: [...portfolioImages.asayaSands.gallery],
    featured: true,
    year: '2024',
    valueStatement: 'The Best Aesthetic Coworking Space',
  },
  {
    id: 'asaya-summit',
    slug: 'asaya-summit',
    name: 'Asaya Summit',
    category: 'Hospitality / Real Estate',
    location: 'Central Highlands, Sri Lanka',
    status: 'Under Development',
    developmentType: 'Destination Concept',
    shortDescription:
      'A distinctive destination concept positioned around experience, place and long-term potential.',
    description:
      'Asaya Summit explores elevated destination living — architecture that responds to terrain, climate and the rhythms of place rather than imposing upon them.',
    overview: [
      'Positioned at the intersection of hospitality and residential development, Asaya Summit is designed as an experience-led asset with enduring appeal.',
      'The concept emphasises panoramic views, natural materials and spaces that encourage contemplation and connection with environment.',
      'This project illustrates GRITHQ\'s interest in distinctive destinations with strong identity and long-term positioning.',
    ],
    vision:
      'To establish a summit destination defined by place, not formula — where architecture and landscape create an irreplaceable sense of arrival.',
    heroImage: portfolioImages.asayaSummit.hero,
    gallery: [...portfolioImages.asayaSummit.gallery],
    featured: true,
    year: '2025',
    valueStatement: 'Hidden Secret in a Mountain',
  },
  {
    id: 'grithq',
    slug: 'grithq',
    name: 'GritHQ',
    category: 'Commercial Real Estate',
    location: 'Colombo, Sri Lanka',
    status: 'Operational',
    developmentType: 'Commercial Office',
    shortDescription:
      'A strategic commercial asset designed to support modern business, connectivity and long-term ownership.',
    description:
      'GritHQ represents the holding company\'s commercial real estate capability — a modern workspace asset designed for connectivity, flexibility and enduring occupancy value.',
    overview: [
      'This commercial asset combines contemporary architecture with functional workspace design, supporting businesses that value location, quality and long-term stability.',
      'The building emphasises natural light, flexible floor plates and premium common areas — attributes that sustain value across market cycles.',
      'GritHQ demonstrates the holding company\'s approach to commercial assets with strategic positioning.',
    ],
    vision:
      'To own and steward commercial spaces that businesses choose not just for today, but for the decade ahead.',
    heroImage: portfolioImages.grithq.hero,
    gallery: [...portfolioImages.grithq.gallery],
    featured: true,
    year: '2023',
    emphasis: 'primary',
    deal: {
      types: ['Sale', 'Rent'],
      route: ROUTES.grithqOpportunity,
    },
  },
  {
    id: 'south-beach',
    slug: 'south-beach',
    name: 'South Beach',
    category: 'Development / Real Estate',
    location: 'Southern Coast, Sri Lanka',
    status: 'Active Development',
    developmentType: 'Mixed-Use Coastal',
    shortDescription:
      'A coastal development opportunity shaped around location, lifestyle and future value.',
    description:
      'South Beach captures the energy of coastal urban living — a development shaped by proximity to water, cultural vibrancy and the enduring appeal of place.',
    overview: [
      'This mixed-use coastal development combines residential, hospitality and retail elements within a walkable, lifestyle-oriented framework.',
      'Architecture responds to the coastal context with generous terraces, natural ventilation and materials that weather beautifully over time.',
      'South Beach illustrates GRITHQ\'s development philosophy: location first, design with intent, value over time.',
    ],
    vision:
      'To create a coastal address that becomes synonymous with its place — not replicable, not generic, but definitively South Beach.',
    heroImage: portfolioImages.southBeach.hero,
    gallery: [...portfolioImages.southBeach.gallery],
    featured: true,
    year: '2024',
    valueStatement: 'The Luxury Penthouse by Sea',
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } | null {
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) return null
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  return { prev, next }
}

export function getPrimaryPortfolioProject(): Project | undefined {
  return projects.find((p) => p.emphasis === 'primary') ?? projects.find((p) => p.id === 'grithq')
}

const SECONDARY_PORTFOLIO_ORDER = ['asaya-sands', 'asaya-summit', 'south-beach'] as const

export function getSecondaryPortfolioProjects(): Project[] {
  return SECONDARY_PORTFOLIO_ORDER.map((id) => projects.find((project) => project.id === id)).filter(
    (project): project is Project => project !== undefined
  )
}

// ─── Developments ───────────────────────────────────────────────────────────

export interface DevelopmentItem {
  id: string
  title: string
  category: 'current' | 'upcoming' | 'completed'
  description: string
  location: string
  status: string
  image: string
}

export const developmentCategories = [
  { id: 'current', label: 'Current Developments' },
  { id: 'upcoming', label: 'Upcoming Projects' },
  { id: 'completed', label: 'Completed Projects' },
] as const

export const developments: DevelopmentItem[] = [
  {
    id: 'dev-coastal',
    title: 'South Beach Coastal Development',
    category: 'current',
    description:
      'A large-scale coastal development integrating residential and hospitality elements along the southern shoreline. Architecture responds to climate, view corridors and the natural rhythm of the coast.',
    location: 'Southern Coast, Sri Lanka',
    status: 'In Progress',
    image: developmentImages.coastal,
  },
  {
    id: 'dev-urban',
    title: 'GritHQ Commercial Campus',
    category: 'current',
    description:
      'A modern commercial workspace asset in Colombo, designed for connectivity, flexibility and long-term occupancy. Premium common areas and flexible floor plates sustain value across market cycles.',
    location: 'Colombo, Sri Lanka',
    status: 'Operational',
    image: developmentImages.urban,
  },
  {
    id: 'dev-hospitality',
    title: 'Asaya Summit Destination',
    category: 'upcoming',
    description:
      'An upcoming highland destination concept — architecture that responds to terrain, climate and the rhythms of place. Experience-led hospitality with enduring appeal.',
    location: 'Central Highlands, Sri Lanka',
    status: 'Concept Phase',
    image: developmentImages.hospitality,
  },
  {
    id: 'dev-residential',
    title: 'Asaya Sands Resort',
    category: 'upcoming',
    description:
      'A premium coastal resort development prioritising landscape integration, local materiality and experiential design. Conceived for long-term hospitality ownership.',
    location: 'Southern Coast, Sri Lanka',
    status: 'Planning',
    image: developmentImages.residential,
  },
  {
    id: 'dev-landscape',
    title: 'Landscape Integration Initiative',
    category: 'completed',
    description:
      'A completed development phase demonstrating GRITHQ\'s commitment to landscape-first design — where built form defers to terrain, vegetation and natural light.',
    location: 'Southern Region, Sri Lanka',
    status: 'Completed',
    image: developmentImages.landscape,
  },
]

export const investmentHighlights = [
  {
    id: 'portfolio-breadth',
    label: 'Asset Classes',
    value: '4',
    description: 'Hospitality, commercial, coastal and highland developments across the portfolio.',
  },
  {
    id: 'ownership-model',
    label: 'Ownership Model',
    value: 'Long-Term',
    description: 'Patient capital deployed with decades-long horizons, not quarterly cycles.',
  },
  {
    id: 'geographic-focus',
    label: 'Geographic Focus',
    value: 'Sri Lanka',
    description: 'Strategic investments anchored in Sri Lanka with select regional opportunities.',
  },
  {
    id: 'stewardship',
    label: 'Stewardship',
    value: 'Active',
    description: 'Hands-on ownership — building, refining and holding assets with intent.',
  },
]

export const philosophyPrinciples = [
  {
    number: '01',
    title: 'LONG-TERM THINKING',
    description:
      'Value is not created overnight. We invest in horizons measured in decades, not quarters. Every asset is evaluated through the lens of what it becomes — not what it earns today.',
    image: images.projects.southBeach2,
  },
  {
    number: '02',
    title: 'STRATEGIC OWNERSHIP',
    description:
      'Ownership is not passive. It is active stewardship of assets with purpose and potential. We do not acquire to flip — we acquire to build, refine and hold.',
    image: images.projects.grithq,
  },
  {
    number: '03',
    title: 'VALUE CREATION',
    description:
      'Every asset, every venture, every decision is evaluated through the lens of enduring value. We create value through design, operation, patience and disciplined execution.',
    image: images.projects.asayaSummit,
  },
  {
    number: '04',
    title: 'DISCIPLINED GROWTH',
    description:
      'Growth without discipline is noise. We expand with intent, measure, and resolve — selecting opportunities that strengthen the portfolio rather than dilute it.',
    image: images.projects.asayaSands,
  },
]

export interface TimelineItem {
  year: string
  label: string
  description: string
}

export const timelineItems: TimelineItem[] = [
  {
    year: '2026',
    label: 'CURRENT',
    description:
      'Building the foundation. Strengthening the portfolio. Deepening impact across assets and communities.',
  },
  {
    year: '2027',
    label: 'BUILDING',
    description:
      'New developments take shape. Strategic ventures expand the ecosystem with purpose and precision.',
  },
  {
    year: '2028',
    label: 'EXPANDING',
    description:
      'Portfolio growth across selected markets and asset classes — always with discipline, never with haste.',
  },
  {
    year: '2030+',
    label: "WHAT'S NEXT?",
    description:
      'The horizon is open. The portfolio is never finished. What comes next is shaped by vision, not convention.',
  },
]

// ─── Impact ─────────────────────────────────────────────────────────────────

export interface ImpactPillar {
  id: string
  title: string
  description: string
}

export interface ImpactStory {
  id: string
  title: string
  description: string
  caption: string
  image: string
}

export interface CommunityInitiative {
  id: string
  title: string
  description: string
  image: string
}

export interface ImpactGalleryItem {
  id: string
  src: string
  caption: string
  aspect: 'landscape' | 'portrait' | 'square'
}

/** Qualitative impact pillars — no unverified numeric claims */
export const impactPillars: ImpactPillar[] = [
  {
    id: 'nourishment',
    title: 'Nourishment',
    description: 'Providing access to nutritious meals for school children across partner communities.',
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Supporting schools and learning environments so children can focus on their futures.',
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Building lasting partnerships with local volunteers, teachers and community leaders.',
  },
]

export const impactStories: ImpactStory[] = [
  {
    id: 'story-meals',
    title: 'A Meal Changes a Morning',
    description:
      'For many children, the school meal programme is the first nutritious meal of the day. It transforms attendance, concentration and the simple dignity of being cared for. This is the human dimension of value creation.',
    caption: 'Feeding Futures programme',
    image: impactImages.children,
  },
  {
    id: 'story-community',
    title: 'Community in Action',
    description:
      'Volunteers, teachers and local partners come together to ensure no child is left behind. The initiative extends beyond food — it builds connection, trust and a shared belief in what communities can achieve.',
    caption: 'Community partnership',
    image: impactImages.community,
  },
  {
    id: 'story-education',
    title: 'Education Starts with Nourishment',
    description:
      'When children are nourished, they learn. When they learn, futures open. GRITHQ\'s commitment to school meal programmes reflects a belief that investment in people is the most enduring investment of all.',
    caption: 'Education and nourishment',
    image: impactImages.school,
  },
]

export const communityInitiatives: CommunityInitiative[] = [
  {
    id: 'initiative-feeding',
    title: 'Feeding Futures',
    description:
      'A community initiative supporting school children through access to nutritious meals and practical assistance. Nourishment enables education. Education enables futures.',
    image: impactImages.feeding,
  },
  {
    id: 'initiative-volunteers',
    title: 'Community Volunteers',
    description:
      'Local volunteers form the backbone of GRITHQ\'s social initiatives — distributing meals, supporting schools and building lasting relationships with the communities we serve.',
    image: impactImages.volunteers,
  },
  {
    id: 'initiative-schools',
    title: 'School Partnership Programme',
    description:
      'Working directly with schools to identify needs, deliver support and measure impact. A partnership model built on trust, consistency and long-term commitment.',
    image: impactImages.school,
  },
]

export const impactGallery: ImpactGalleryItem[] = [
  { id: 'g1', src: images.volunteer.one, caption: 'School meal distribution', aspect: 'landscape' },
  { id: 'g2', src: images.volunteer.three, caption: 'Community gathering', aspect: 'portrait' },
  { id: 'g3', src: images.volunteer.two, caption: 'Nutritious meals prepared daily', aspect: 'landscape' },
  { id: 'g4', src: images.volunteer.four, caption: 'Volunteers in action', aspect: 'square' },
  { id: 'g5', src: images.volunteer.one, caption: 'School environment', aspect: 'landscape' },
  { id: 'g6', src: images.volunteer.two, caption: 'Lives touched', aspect: 'portrait' },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactInfo = {
  email: 'hello@grithq.co',
  phone: 'Contact via email',
  address: 'GRITHQ, No 109, Main Road, Battaramulla',
  contactPerson: 'GritHQ Team',
  whatsapp: '#',
  whatsappDisplay: '[SAMPLE] Link to be confirmed',
  social: {
    linkedin: 'https://www.linkedin.com/company/grithq/',
    instagram: 'https://instagram.com',
    // twitter: 'https://twitter.com',
  },
}

export const enquiryTypes = STRINGS.contact.enquiryTypes

export const identityVisual = {
  image: images.identity.editorial,
  alt: STRINGS.sections.identity.identityImageAlt,
} as const

export const gritHQPropertyData = {
  id: 'grithq',
  name: 'GritHQ',
  route: ROUTES.grithqOpportunity,
  backHref: ROUTES.portfolio,
  inquiryHref: '#inquiry',
  heroImage: portfolioImages.grithq.hero,
  category: 'Commercial Real Estate',
  location: 'Battaramulla, Sri Lanka',
  driveLink: EXTERNAL_LINKS.grithqPhotoDrive,
  commercialTerms: {
    sale: {
      label: STRINGS.opportunity.saleLabel,
      value: 'USD 3.7 Mn',
    },
    rent: {
      label: STRINGS.opportunity.rentLabel,
      value: 'LKR 8 Million + VAT',
    },
  },
  executiveSummary: [
    'We are pleased to present this exceptional commercial opportunity at a state-of-the-art, fully furnished office complex designed to meet the demanding requirements of modern corporations.',
    'This premium property offers nearly 25,000 sq ft of total floor area across six floors. It is located in the heart of Battaramulla\'s thriving business district.',
    'The building provides capacity for 381 occupants, with 266 individual workstations and comprehensive meeting facilities for 50.',
  ],
  keyFigures: [
    { value: '24,746', label: 'SQ FT COVERED' },
    { value: '6', label: 'FLOORS' },
    { value: '266', label: 'WORKSTATIONS' },
    { value: '6', label: 'CONFERENCE ROOMS' },
    { value: '160KW', label: 'GENERATOR' },
  ],
  specifications: [
    {
      name: 'Ground Floor',
      details: ['4,213 sq ft covered area', '+ 3,772 sq ft open parking area'],
    },
    {
      name: 'First Floor',
      details: ['4,119 sq ft'],
    },
    {
      name: 'Second Floor',
      details: ['4,119 sq ft'],
    },
    {
      name: 'Third Floor',
      details: ['4,054 sq ft'],
    },
    {
      name: 'Fourth Floor',
      details: ['4,054 sq ft'],
    },
    {
      name: 'Fifth Floor',
      details: ['4,187 sq ft'],
    },
    {
      name: 'Total Available',
      details: ['24,746 sq ft covered', '+ 3,772 sq ft open parking space'],
    },
  ],
  additionalParking:
    'An additional rented parking facility behind the building may also be made available.',
  floorConfiguration: [
    {
      title: 'Six Floors Total',
      text: 'Including basement parking level.',
    },
    {
      title: 'Flexible Layout',
      text: 'Open-plan design with modular workstations.',
    },
  ],
  workspace: [
    {
      title: 'Individual Workstations',
      value: '266 dedicated workspaces',
      note: '(including meeting room capacity)',
    },
    {
      title: 'Meeting Room Capacity',
      value: '50 seats across six conference rooms',
    },
    {
      title: 'Common Area Seating',
      value: '65 additional seats for collaboration and break areas',
    },
    {
      title: 'Total Occupancy Capacity',
      value: '331 people',
    },
  ],
  features: [
    'Four sound-proof phone booths with integrated power and data connections',
    'Double-pane glass frontage for superior insulation and noise reduction',
    'Professional-grade flooring and lighting',
    '160KW generator',
    'All floors and meeting rooms are air-conditioned except the 5th floor',
    'Each floor has a mini pantry',
    'Larger pantry and bar on the 5th floor',
    'Mitsubishi elevator',
  ],
  locationBenefits: [
    {
      title: 'Location',
      text: 'Heart of Battaramulla — premium commercial district location',
    },
    {
      title: 'Strategic Position',
      text: "Positioned in Sri Lanka's emerging business hub",
    },
    {
      title: 'Connectivity',
      text: 'Excellent connectivity to Colombo and surrounding areas',
    },
    {
      title: 'Accessibility',
      text: 'Close proximity to government institutions and corporate offices',
    },
    {
      title: 'Business Environment',
      text: 'Professional business district setting with high visibility',
    },
    {
      title: 'Energy Efficiency',
      text: 'Modern building systems designed to reduce operational costs',
    },
    {
      title: 'Parking',
      text: 'Ample on-site parking for staff and clients',
    },
  ],
} as const

/** @deprecated Use gritHQPropertyData */
export const grithqOpportunity = gritHQPropertyData
