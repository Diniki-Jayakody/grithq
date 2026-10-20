import { useState, type FormEvent } from 'react'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { contactInfo } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { sendSiteEmail } from '@/constants/emailjs'
import { isValidEmail } from '@/utils/validation'
import { styles } from '@/styles/styles'


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
  const copy = STRINGS.contact.form
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
  // const { setCursorState } = useCursorState()
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

        <div className="mx-auto mt-12 w-full max-w-2xl">
          
            <>
              

                <div className="space-y-3 text-sm text-grithq-cream/50">
                  <p>
                    {contactInfo.email}
                  </p>
                </div>
         
            </>
          
        </div>
      </div>
    </section>
  )
}
