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
  linkedinHref: string
}

export const leadershipProfiles: LeadershipProfile[] = [
  {
    id: 'founder',
    name: STRINGS.leadership.name,
    nameDisplay: STRINGS.leadership.nameDisplay,
    role: STRINGS.leadership.role,
    description: STRINGS.leadership.description,
    image: images.founder,
    linkedinHref: EXTERNAL_LINKS.mangalaLinkedIn,
  },
]

export interface LeadershipCredential {
  id: string
  role: string
  organization?: string
  organizationLine2?: string
}

export const leadershipCredentials: LeadershipCredential[] = STRINGS.leadership.credentials.map(
  (item) => ({
    id: item.id,
    role: item.role,
    organization: 'organization' in item ? item.organization : undefined,
    organizationLine2: 'organizationLine2' in item ? item.organizationLine2 : undefined,
  })
)

export const leadershipMessage = {
  route: ROUTES.messageFromMangala,
  backHref: ROUTES.leadership,
  year: '2026',
  paragraphs: [
    'GritHQ was formed around a simple conviction: capital is most useful when it is patient, responsible and directed toward assets that can compound in value over time.',
    'We look for opportunities where ownership is an act of stewardship, where buildings, businesses and partnerships can be strengthened rather than merely transacted. Patient thinking is not a slogan for us. It is the standard by which every decision is weighed.',
    'Responsible investment, in our view, means aligning capital with people and places that can endure. We prefer partnerships built on clarity, discipline and shared ambition. Sustainable value is created when those conditions are present, and protected when they are not.',
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
      'Properties and developments we hold for lasting value.',
    image: images.investmentFocus.realEstate,
  },
  {
    id: 'hospitality',
    number: '02',
    title: 'HOSPITALITY AND EXPERIENCES',
    description:
      'Places to stay and experiences shaped by the setting.',
    image: images.investmentFocus.hospitality,
  },
  {
    id: 'technological-investments',
    number: '03',
    title: 'TECHNOLOGICAL INVESTMENTS',
    description:
      'Technology businesses with a clear product and room to grow.',
    image: images.investmentFocus.businesses,
  },
  {
    id: 'selective-opportunities',
    number: '04',
    title: 'SELECTIVE OPPORTUNITIES',
    description:
      'A small number of other investments we take on with care.',
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
  websiteHref?: string
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
      'A coastal hospitality property with guest rooms, shared workspace and a setting shaped by the landscape.',
    description:
      'Asaya Sands is a coastal hospitality property in southern Sri Lanka. It brings together guest stays, shared workspace and a setting that stays close to the land.',
    overview: [
      'The architecture is kept simple and open, so the buildings sit within the landscape rather than overpowering it.',
      'Alongside rooms for guests, Asaya Sands includes shared workspace. The aim is a place that works for both rest and focused work.',
    ],
    vision:
      'To build a coastal property with a clear identity and a long ownership view.',
    heroImage: portfolioImages.asayaSands.hero,
    gallery: [...portfolioImages.asayaSands.gallery],
    featured: true,
    year: '2024',
    valueStatement: 'The Best Aesthetic Coworking Space',
    websiteHref: EXTERNAL_LINKS.asayaSands,
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
      'A mountain destination concept planned around the highland setting and a quieter pace.',
    description:
      'Asaya Summit is a destination concept in the central highlands of Sri Lanka. The project is still under development.',
    overview: [
      'It is planned around the mountain setting, with views, local materials and a slower pace of stay.',
      'The concept sits between hospitality and residential use, with a long view rather than a short stay product.',
    ],
    vision:
      'To create a mountain destination that feels specific to its place.',
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
      'A commercial building in Colombo, designed as a modern workspace for lasting use.',
    description:
      'GritHQ is a commercial building in Colombo. It is designed as a modern workspace for businesses that want a strong location and a lasting home.',
    overview: [
      'The building offers natural light, flexible floors and shared areas made for daily work.',
      'It is the holding company’s own commercial property and is now available for sale or rent.',
    ],
    vision:
      'To own commercial space that businesses want to stay in over time.',
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
    developmentType: 'Mixed Use Coastal',
    shortDescription:
      'A coastal development on Sri Lanka’s southern coast, shaped by location and lifestyle.',
    description:
      'South Beach is a coastal development on Sri Lanka’s southern coast. The project is a luxury penthouse by the sea.',
    overview: [
      'The design looks to the coast, with outdoor space and a setting defined by the water.',
      'It is planned as a lasting residential asset, not a generic seaside template.',
    ],
    vision:
      'To create a coastal address that belongs to this place.',
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
  const order = ['asaya-sands', 'asaya-summit', 'south-beach', 'grithq'] as const
  const current = projects.find((p) => p.slug === slug)
  if (!current) return null

  const currentOrderIndex = order.findIndex((id) => id === current.id)
  if (currentOrderIndex === -1) return null

  const prev = projects.find((p) => p.id === order[(currentOrderIndex - 1 + order.length) % order.length])
  const next = projects.find((p) => p.id === order[(currentOrderIndex + 1) % order.length])
  if (!prev || !next || next.id === current.id) return null
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

// ─── Invested Businesses ────────────────────────────────────────────────────

export interface InvestedBusiness {
  id: string
  name: string
  image: string
  href: string
}

export const investedBusinesses: InvestedBusiness[] = [
  {
    id: 'flash-health',
    name: STRINGS.investorFor.projects.flashHealth,
    image: images.invested.flashHealth,
    href: EXTERNAL_LINKS.investedProjects.FlashHealth,
  },
  {
    id: 'dossiers',
    name: STRINGS.investorFor.projects.dossiers,
    image: images.invested.dossiers,
    href: EXTERNAL_LINKS.investedProjects.Dossiers,
  },
  {
    id: 'rootstone',
    name: STRINGS.investorFor.projects.rootstone,
    image: images.invested.rootstone,
    href: EXTERNAL_LINKS.investedProjects.Rootstone,
  },
  {
    id: 'magic-unbound',
    name: STRINGS.investorFor.projects.magicUnbound,
    image: images.invested.magicUnbound,
    href: EXTERNAL_LINKS.investedProjects.MagicUnbound,
  },
]

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
      'A large coastal development integrating residential and hospitality elements along the southern shoreline. Architecture responds to climate, view corridors and the natural rhythm of the coast.',
    location: 'Southern Coast, Sri Lanka',
    status: 'In Progress',
    image: developmentImages.coastal,
  },
  {
    id: 'dev-urban',
    title: 'GritHQ Commercial Campus',
    category: 'current',
    description:
      'A modern commercial workspace asset in Colombo, designed for connectivity, flexibility and lasting occupancy. Premium common areas and flexible floor plates sustain value across market cycles.',
    location: 'Colombo, Sri Lanka',
    status: 'Operational',
    image: developmentImages.urban,
  },
  {
    id: 'dev-hospitality',
    title: 'Asaya Summit Destination',
    category: 'upcoming',
    description:
      'An upcoming highland destination concept. Architecture that responds to terrain, climate and the rhythms of place. Hospitality shaped by experience, with lasting appeal.',
    location: 'Central Highlands, Sri Lanka',
    status: 'Concept Phase',
    image: developmentImages.hospitality,
  },
  {
    id: 'dev-residential',
    title: 'Asaya Sands Resort',
    category: 'upcoming',
    description:
      'A premium coastal resort development prioritising landscape integration, local materiality and experiential design. Conceived for lasting hospitality ownership.',
    location: 'Southern Coast, Sri Lanka',
    status: 'Planning',
    image: developmentImages.residential,
  },
  {
    id: 'dev-landscape',
    title: 'Landscape Integration Initiative',
    category: 'completed',
    description:
      'A completed development phase demonstrating GRITHQ\'s commitment to landscape first design, where built form defers to terrain, vegetation and natural light.',
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
    value: 'Lasting',
    description: 'Patient capital deployed with horizons measured in decades, not quarterly cycles.',
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
    description: 'Direct ownership: building, refining and holding assets with intent.',
  },
]

export const philosophyPrinciples = [
  {
    number: '01',
    title: 'LASTING THINKING',
    description:
      'Value is not created overnight. We invest in horizons measured in decades, not quarters. Every asset is evaluated through the lens of what it becomes, not what it earns today.',
    image: images.projects.southBeach2,
  },
  {
    number: '02',
    title: 'STRATEGIC OWNERSHIP',
    description:
      'Ownership is not passive. It is active stewardship of assets with purpose and potential. We do not acquire to flip. We acquire to build, refine and hold.',
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
      'Growth without discipline is noise. We expand with intent, measure, and resolve, selecting opportunities that strengthen the portfolio rather than dilute it.',
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
      'Portfolio growth across selected markets and asset classes, always with discipline, never with haste.',
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
  alt: string
}

export const impactGallery: ImpactGalleryItem[] = [
  { id: 'g1', src: images.volunteer.one, alt: STRINGS.sections.impact.galleryImageAlt },
  { id: 'g2', src: images.volunteer.two, alt: STRINGS.sections.impact.galleryImageAlt },
  { id: 'g3', src: images.volunteer.three, alt: STRINGS.sections.impact.galleryImageAlt },
  { id: 'g4', src: images.volunteer.four, alt: STRINGS.sections.impact.galleryImageAlt },
  { id: 'g5', src: images.volunteer.five, alt: STRINGS.sections.impact.galleryImageAlt },
]

/** Qualitative impact pillars. No unverified numeric claims. */
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
      'Volunteers, teachers and local partners come together to ensure no child is left behind. The initiative extends beyond food. It builds connection, trust and a shared belief in what communities can achieve.',
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
      'Local volunteers form the backbone of GRITHQ\'s social initiatives, distributing meals, supporting schools and building lasting relationships with the communities we serve.',
    image: impactImages.volunteers,
  },
  {
    id: 'initiative-schools',
    title: 'School Partnership Programme',
    description:
      'Working directly with schools to identify needs, deliver support and measure impact. A partnership model built on trust, consistency and lasting commitment.',
    image: impactImages.school,
  },
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
    'We are pleased to present this exceptional commercial opportunity at a modern, fully furnished office complex designed to meet the demanding requirements of modern corporations.',
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
      text: 'Open plan design with modular workstations.',
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
    'Four soundproof phone booths with integrated power and data connections',
    'Double pane glass frontage for superior insulation and noise reduction',
    'Professional grade flooring and lighting',
    '160KW generator',
    'All floors and meeting rooms have air conditioning except the 5th floor',
    'Each floor has a mini pantry',
    'Larger pantry and bar on the 5th floor',
    'Mitsubishi elevator',
  ],
  locationBenefits: [
    {
      title: 'Location',
      text: 'Heart of Battaramulla, a premium commercial district location',
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
      text: 'Ample on site parking for staff and clients',
    },
  ],
} as const

/** @deprecated Use gritHQPropertyData */
export const grithqOpportunity = gritHQPropertyData
