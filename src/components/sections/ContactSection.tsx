import { useState, type FormEvent } from 'react'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { contactInfo, enquiryTypes } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { sendSiteEmail } from '@/constants/emailjs'
import { isValidEmail } from '@/utils/validation'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormValues {
  name: string
  email: string
  company: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  company: '',
  message: '',
}

function validate(values: FormValues): FormErrors {
  const copy = STRINGS.contact.form.validation
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = copy.name
  if (!isValidEmail(values.email)) errors.email = copy.email
  if (!values.message.trim()) errors.message = copy.message

  return errors
}

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const { setCursorState } = useCursorState()
  const copy = STRINGS.contact.form
  const isSending = status === 'sending'
  const submitLabel =
    status === 'sending' ? copy.sending : status === 'error' ? copy.retry : copy.submit

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSending) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('sending')

    try {
      await sendSiteEmail({
        subject: copy.subject,
        formType: copy.formType,
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        property: copy.property,
      })
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      className={`${styles.sectionDark} border-t border-grithq-cream/5`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel>
          {STRINGS.sections.contact.label}
        </SectionLabel>

        <div className="mt-12 grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <DisplayText
              as="h2"
              id="contact-heading"
              className="text-[clamp(2.5rem,7vw,6rem)] font-black leading-[0.9] uppercase"
            >
              {STRINGS.sections.contact.heading}
              <br />
              {STRINGS.sections.contact.headingLine2}
            </DisplayText>

            <div className="mt-12 space-y-6">
              {enquiryTypes.map((type) => (
                <p
                  key={type}
                  className="font-display text-sm tracking-widest text-grithq-cream/40 uppercase"
                >
                  {type}
                </p>
              ))}
            </div>

            <div className="mt-12 space-y-3 text-sm text-grithq-cream/50">
              <p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="transition-colors hover:text-grithq-offwhite"
                  onMouseEnter={() => setCursorState('open')}
                  onMouseLeave={() => setCursorState('default')}
                >
                  {contactInfo.email}
                </a>
              </p>
              <p>{contactInfo.phone}</p>
              <p>{contactInfo.address}</p>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div role="status" className="flex h-full items-center">
                <p className="font-display text-xl font-light text-grithq-offwhite">
                  {STRINGS.sections.contact.submitSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="sr-only">
                    {copy.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={values.name}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder={copy.name}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className={styles.formError}>
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    {copy.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={values.email}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, email: event.target.value }))
                    }
                    placeholder={copy.email}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className={styles.formError}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="company" className="sr-only">
                    {copy.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, company: event.target.value }))
                    }
                    placeholder={copy.company}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    {copy.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={values.message}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, message: event.target.value }))
                    }
                    placeholder={copy.message}
                    className="w-full resize-none border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className={styles.formError}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <div role="alert" className="border border-grithq-cream/15 px-5 py-4">
                    <p className="font-display text-[10px] tracking-[0.3em] text-grithq-mauve uppercase">
                      {copy.error}
                    </p>
                    <p className={`mt-2 ${styles.formError}`}>{copy.errorMessage}</p>
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={isSending}
                  className="group mt-4 border border-grithq-cream/20 px-10 py-4 transition-colors hover:border-grithq-mauve hover:bg-grithq-mauve/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-grithq-offwhite uppercase">
                    {submitLabel}
                  </span>
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
