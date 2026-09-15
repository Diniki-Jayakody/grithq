/** GritHQ brand palette. Single source of truth. */
export const COLORS = {
  burgundy: '#4D1730',
  deepWine: '#48132B',
  mauve: '#9B5D8A',
  softRose: '#E8DEE3',
  offWhite: '#F7F3F4',
  deepAccent: '#5A0C3D',
  black: '#0a0608',
  warm: '#1a0e14',
  impact: '#2d1522',
  landingBackground: '#30051E',
  portfolioBackground: '#FFF5F9',
} as const

export type BrandColor = keyof typeof COLORS
