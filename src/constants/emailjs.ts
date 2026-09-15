import emailjs from '@emailjs/browser'

/** EmailJS configuration. Values come from environment variables only. */

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
} as const

export function isEmailJsConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.serviceId && EMAILJS_CONFIG.templateId && EMAILJS_CONFIG.publicKey
  )
}

export const EMAILJS_TEMPLATE_FIELDS = {
  subject: 'subject',
  formType: 'form_type',
  name: 'name',
  email: 'email',
  phone: 'phone',
  property: 'property',
  message: 'message',
} as const

export interface SiteEmailPayload {
  subject: string
  formType: string
  name: string
  email: string
  message: string
  phone?: string
  property: string
}

export async function sendSiteEmail(payload: SiteEmailPayload) {
  if (!isEmailJsConfigured()) {
    throw new Error('EmailJS is not configured')
  }

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        subject: payload.subject,
        form_type: payload.formType,
        name: payload.name,
        email: payload.email,
        phone: payload.phone ?? '',
        property: payload.property,
        message: payload.message,
      },
      {
        publicKey: EMAILJS_CONFIG.publicKey,
      }
    )
  
    console.log('EmailJS SUCCESS:', response)
  
    return response
  } catch (error) {
    console.error('EmailJS ERROR:', error)
    throw error
  }
}
