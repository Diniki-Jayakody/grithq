import { useState, type FormEvent } from 'react'
import { SectionLabel } from '@/components/typography/SectionLabel'
import { DisplayText } from '@/components/typography/DisplayText'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { contactInfo, enquiryTypes } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { useCursorState } from '@/hooks/useCursorState'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const { setCursorState } = useCursorState()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className={`${styles.sectionDark} border-t border-grithq-cream/5`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.sectionContainer}>
        <SectionLabel number={STRINGS.sections.contact.number}>
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
            {submitted ? (
              <div className="flex h-full items-center">
                <p className="font-display text-xl font-light text-grithq-offwhite">
                  {STRINGS.sections.contact.submitSuccess}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="sr-only">
                    {STRINGS.contact.form.name}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={STRINGS.contact.form.name}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    {STRINGS.contact.form.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={STRINGS.contact.form.email}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="sr-only">
                    {STRINGS.contact.form.company}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={STRINGS.contact.form.company}
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="enquiry" className="sr-only">
                    {STRINGS.contact.form.enquiryType}
                  </label>
                  <select
                    id="enquiry"
                    name="enquiry"
                    required
                    defaultValue=""
                    className="w-full border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  >
                    <option value="" disabled>
                      {STRINGS.contact.form.enquiryType}
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="bg-grithq-black text-grithq-offwhite">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">
                    {STRINGS.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={STRINGS.contact.form.message}
                    className="w-full resize-none border-b border-grithq-cream/20 bg-transparent py-4 text-sm text-grithq-offwhite placeholder:text-grithq-cream/30 focus:border-grithq-mauve focus:outline-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="group mt-4 border border-grithq-cream/20 px-10 py-4 transition-colors hover:border-grithq-mauve hover:bg-grithq-mauve/10"
                >
                  <span className="font-display text-xs tracking-[0.3em] text-grithq-offwhite uppercase">
                    {STRINGS.contact.form.submit}
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
