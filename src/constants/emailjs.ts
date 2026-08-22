/** EmailJS configuration — values come from environment variables only */

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
  propertyName: 'GritHQ',
} as const

export function isEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
  )
}

export const EMAILJS_TEMPLATE_FIELDS = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  inquiryType: 'inquiry_type',
  message: 'message',
  property: 'property',
  submittedAt: 'submitted_at',
} as const
