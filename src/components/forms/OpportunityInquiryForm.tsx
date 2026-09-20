import { useState, type FormEvent } from 'react'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { STRINGS } from '@/constants/strings'
import { sendSiteEmail } from '@/constants/emailjs'
import { isValidEmail } from '@/utils/validation'
import { styles } from '@/styles/styles'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormValues {
  name: string
  email: string
  phone: string
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
  phone: '',
  message: '',
}

function validate(values: FormValues): FormErrors {
  const copy = STRINGS.opportunity.form.validation
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = copy.name
  if (!isValidEmail(values.email)) errors.email = copy.email
  if (!values.message.trim()) errors.message = copy.message

  return errors
}

export function OpportunityInquiryForm() {
  const copy = STRINGS.opportunity.form
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const isSending = status === 'sending'
  const submitLabel =
    status === 'sending' ? copy.sending : status === 'error' ? copy.retry : copy.submit

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
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
        phone: values.phone.trim(),
        message: values.message.trim(),
        property: copy.property,
      })
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border border-grithq-cream/15 px-6 py-8">
        <p className="font-display text-xs tracking-[0.3em] text-grithq-mauve uppercase">
          {copy.success}
        </p>
        <p className={`mt-4 ${styles.bodyTextMuted}`}>{copy.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="opportunity-name" className={styles.formLabel}>
          {copy.name}
        </label>
        <input
          id="opportunity-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          className={styles.formField}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'opportunity-name-error' : undefined}
        />
        {errors.name && (
          <p id="opportunity-name-error" className={styles.formError}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="opportunity-email" className={styles.formLabel}>
          {copy.email}
        </label>
        <input
          id="opportunity-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          className={styles.formField}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'opportunity-email-error' : undefined}
        />
        {errors.email && (
          <p id="opportunity-email-error" className={styles.formError}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="opportunity-phone" className={styles.formLabel}>
          {copy.phone}
        </label>
        <input
          id="opportunity-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))}
          className={styles.formField}
        />
      </div>

      <div>
        <label htmlFor="opportunity-message" className={styles.formLabel}>
          {copy.message}
        </label>
        <textarea
          id="opportunity-message"
          name="message"
          required
          rows={4}
          value={values.message}
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
          placeholder={copy.messagePlaceholder}
          className={`${styles.formField} resize-none`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'opportunity-message-error' : undefined}
        />
        {errors.message && (
          <p id="opportunity-message-error" className={styles.formError}>
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
        className={`${styles.ctaButton} w-full px-6 sm:w-auto sm:px-10 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <span className="font-display text-xs tracking-[0.3em] text-grithq-offwhite uppercase">
          {submitLabel}
        </span>
      </MagneticButton>
    </form>
  )
}
