import { useEffect } from 'react'
import { leadershipMessage } from '@/constants/data'
import { STRINGS } from '@/constants/strings'
import { styles } from '@/styles/styles'
import { PageBackLink } from '@/components/navigation/PageBackLink'
import { DisplayText } from '@/components/typography/DisplayText'
import { useLenisScroll } from '@/providers/SmoothScrollProvider'

export function MessageFromMangala() {
  const { scrollTo } = useLenisScroll()

  useEffect(() => {
    scrollTo(0, { offset: 0 })
  }, [scrollTo])

  return (
    <article className={`${styles.innerPage} bg-grithq-offwhite text-grithq-burgundy`}>
      <div className={`${styles.sectionContainer} max-w-3xl`}>
        <PageBackLink fallback={leadershipMessage.backHref} variant="light" />

        <header className="mt-10 md:mt-14">
          <p className={styles.eyebrowLight}>{STRINGS.message.eyebrow}</p>
          <DisplayText
            as="h1"
            className="mt-4 text-[clamp(1.75rem,5vw,3.5rem)] text-grithq-burgundy"
          >
            {STRINGS.message.name}
          </DisplayText>
          <p className="mt-4 font-display text-xs tracking-[0.3em] text-grithq-burgundy/45">
            {leadershipMessage.year}
          </p>
          <p className="mt-3 text-xs italic tracking-wide text-grithq-burgundy/45">
            {STRINGS.message.sampleNotice}
          </p>
        </header>

        <div className={`mt-10 space-y-6 md:mt-14 ${styles.letterBody}`}>
          {leadershipMessage.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <footer className="mt-12 md:mt-16">
          <p className={styles.letterBody}>{STRINGS.message.signOff}</p>
          <p className="mt-3 font-display text-sm tracking-[0.16em] text-grithq-burgundy">
            {STRINGS.message.signature}
          </p>
        </footer>
      </div>
    </article>
  )
}
