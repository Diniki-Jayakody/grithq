/** Reusable Tailwind class patterns */

export const styles = {
  sectionContainer: 'mx-auto max-w-7xl section-padding',
  sectionLight: 'relative section-y bg-grithq-offwhite text-grithq-burgundy',
  sectionLightAlt: 'relative section-y bg-grithq-cream/30 text-grithq-burgundy',
  sectionPortfolio: 'relative section-y bg-grithq-portfolio text-grithq-burgundy',
  sectionDark: 'relative section-y bg-grithq-black',
  sectionWarm: 'relative section-y bg-grithq-warm',

  eyebrow:
    'font-display text-xs tracking-[0.3em] text-grithq-mauve uppercase',
  eyebrowLight:
    'font-display text-xs tracking-[0.3em] text-grithq-deepAccent uppercase',
  sectionHeading:
    'font-display text-[clamp(1.75rem,5vw,4.5rem)] font-light tracking-tight',
  bodyText: 'text-sm leading-relaxed md:text-base',
  bodyTextMuted: 'text-sm leading-relaxed text-grithq-cream/60 md:text-base',
  bodyTextMutedLight:
    'text-sm leading-relaxed text-grithq-burgundy/60 md:text-base',

  card: 'rounded-sm border border-grithq-cream/10 bg-grithq-black/40 p-8 md:p-10',
  cardLight:
    'rounded-sm border border-grithq-burgundy/10 bg-grithq-offwhite p-8 md:p-10',

  ctaButton:
    'inline-flex items-center justify-center border border-grithq-cream/20 px-10 py-4 font-display text-xs tracking-[0.3em] uppercase transition-colors hover:border-grithq-mauve hover:bg-grithq-mauve/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-black',
  ctaButtonLight:
    'inline-flex items-center justify-center border border-grithq-burgundy/20 px-8 py-3.5 font-display text-xs tracking-[0.3em] uppercase text-grithq-burgundy transition-colors hover:border-grithq-deepAccent hover:bg-grithq-burgundy/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2 focus-visible:ring-offset-grithq-offwhite',

  glass:
    'border border-grithq-offwhite/20 bg-grithq-black/80 backdrop-blur-sm',

  imageCover: 'h-full w-full object-cover',

  navLogo:
    'h-7 w-auto max-w-[120px] object-contain brightness-0 invert md:h-8 md:max-w-[140px]',

  identitySectionTitle:
    'font-display text-[clamp(1.5rem,4vw,2.75rem)] font-light tracking-[0.35em] text-grithq-burgundy uppercase',
  identityHeading:
    'font-display text-[clamp(1.75rem,5vw,3.75rem)] font-light leading-[1.1] tracking-tight text-grithq-burgundy text-balance',
  identitySubtext:
    'mx-auto max-w-2xl text-[clamp(0.95rem,2.2vw,1.25rem)] leading-relaxed text-grithq-burgundy/65 text-balance',
  identityFocusHeading:
    'mt-6 text-[clamp(1.75rem,4.5vw,3.5rem)] text-grithq-burgundy',

  pageBackLink:
    'inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grithq-mauve/70 focus-visible:ring-offset-2',
  credentialBlock:
    'border border-grithq-burgundy/20 bg-transparent px-6 py-5 md:px-8 md:py-6',
  letterBody:
    'max-w-2xl text-[0.95rem] leading-[1.85] text-grithq-burgundy/70 break-words md:text-base md:leading-[1.9]',
  innerPage:
    'relative min-h-screen overflow-x-hidden pt-28 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32',
  opportunitySection: 'relative py-14 md:py-16 lg:py-20',
  opportunityHeading:
    'font-display text-xs tracking-[0.4em] text-grithq-mauve uppercase',
  opportunityDealPanel:
    'border border-grithq-burgundy/15 bg-grithq-offwhite/40 px-5 py-5 md:px-8 md:py-6',
  formLabel:
    'mb-2 block font-display text-[10px] tracking-[0.25em] text-grithq-mauve uppercase',
  formField:
    'w-full border-b border-grithq-cream/20 bg-transparent py-3 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none',
  formError: 'mt-2 text-xs leading-relaxed text-grithq-cream/65',
} as const
