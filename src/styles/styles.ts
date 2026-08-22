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
    'inline-flex items-center justify-center border border-grithq-cream/20 px-10 py-4 font-display text-xs tracking-[0.3em] uppercase transition-colors hover:border-grithq-mauve hover:bg-grithq-mauve/10',

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
} as const
