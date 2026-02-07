import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

function useTypewriter(text, speed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)

  const start = useCallback(() => setStarted(true), [])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      setDone(true)
      return
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [displayed, started, text, speed])

  return { displayed, done, start }
}

function useFadeIn() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

function FadeSection({ children, className = '', delay = 0, noSlide = false }) {
  const ref = useFadeIn()
  const style = delay ? { transitionDelay: `${delay}s` } : undefined
  const classes = `fade-section ${noSlide ? 'no-slide' : ''} ${className}`
  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  )
}

function useGrain() {
  // No-op — texture applied via CSS
}

const today = new Date()
const formattedDate = today.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const selectedWork = [
  {
    publication: 'Jerusalem Post',
    headline: 'Article Title Here',
    excerpt: 'A brief description or lede of the article goes here. Leonard can replace this with a real excerpt from his published work.',
    url: '#',
  },
  {
    publication: 'Business Insider',
    headline: 'Article Title Here',
    excerpt: 'Another article excerpt placeholder. Swap in real headlines, ledes, and links to published pieces.',
    url: '#',
  },
  {
    publication: 'New York Sun',
    headline: 'Article Title Here',
    excerpt: 'One more placeholder for a third featured clip. These are the pieces that best represent his range.',
    url: '#',
  },
]

function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const typewriter = useTypewriter('Leonard A. Robinson', 55)
  const mastheadRef = useRef(null)

  useGrain()

  useEffect(() => {
    const el = mastheadRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          typewriter.start()
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div className="page">
      {/* ── Masthead ── */}
      <FadeSection noSlide>
        <header className="masthead" ref={mastheadRef}>
          <p className="masthead-date">{formattedDate}</p>
          <h1 className="masthead-title" aria-label="Leonard A. Robinson">
            <span className="masthead-title-ghost">Leonard A. Robinson</span>
            <span className="masthead-title-typed">
              {typewriter.displayed}
              {!typewriter.done && <span className="typewriter-cursor">|</span>}
            </span>
          </h1>
          <p className={`masthead-subtitle ${typewriter.done ? 'subtitle-visible' : 'subtitle-hidden'}`}>Writer &middot; Journalist &middot; New York City</p>
          <div className="masthead-rule">
            <span>Est. Baltimore, MD</span>
          </div>
        </header>
      </FadeSection>

      {/* ── Profile ── */}
      <FadeSection className="headline-section" delay={0.15}>
        <div className="profile-layout">
          <div>
            <div className="profile-image-wrap">
              <img
                src="/leonard.webp"
                alt="Leonard A. Robinson"
                className="profile-image"
              />
            </div>
            <p className="profile-caption">Leonard A. Robinson</p>
          </div>
          <div className="profile-text">
            <p>
              Leonard A. Robinson is a writer based in New York City. His reporting
              career has included stints at The Center Square, Morning Brew — CFO
              Brew, specifically — and American City Business Journals in New York
              and Baltimore.
            </p>
            <p>
              His writing has appeared in Jerusalem Post, New York Sun and Business
              Insider among others. Robinson's professional experience beyond
              journalism has included serving in a corporate communications role for
              a software company and writing for two Washington, D.C.-based think
              tanks.
            </p>
            <p>
              A graduate of the University of Baltimore, he served as editor of the
              university newspaper and was an intern at Reason, Carolina Journal —
              the official publication of the John Locke Foundation in North
              Carolina — and the New York Times Student Journalism Institute.
            </p>
          </div>
        </div>
      </FadeSection>

      <hr className="section-rule double" />

      {/* ── Selected Work ── */}
      <FadeSection className="clips-section" delay={0.1}>
        <h2 className="columns-header">Selected Work</h2>
        <div className="clips-grid">
          {selectedWork.map((piece, i) => (
            <FadeSection key={i} className="clip-card" delay={0.2 * (i + 1)}>
              <span className="clip-pub">{piece.publication}</span>
              <h3 className="clip-headline">
                <a href={piece.url}>{piece.headline}</a>
              </h3>
              <p className="clip-excerpt">{piece.excerpt}</p>
              <a href={piece.url} className="clip-link">Read &rarr;</a>
            </FadeSection>
          ))}
        </div>
      </FadeSection>

      <hr className="section-rule double" />

      {/* ── The Record ── */}
      <FadeSection className="columns-section" delay={0.1}>
        <h2 className="columns-header">The Record</h2>
        <div className="columns-grid">
          {[
            {
              title: 'Publications',
              items: ['Jerusalem Post', 'New York Sun', 'Business Insider', 'Morning Brew (CFO Brew)', 'The Center Square', 'American City Business Journals'],
            },
            {
              title: 'Experience',
              items: ['Business & Financial Reporting', 'Corporate Communications', 'Policy & Think Tank Writing', 'University Newspaper Editor'],
            },
            {
              title: 'Education & Training',
              items: ['University of Baltimore', 'Reason — Editorial Intern', 'Carolina Journal — Intern', 'NYT Student Journalism Institute'],
            },
          ].map((col, i) => (
            <FadeSection key={i} className="column-card" delay={0.2 * (i + 1)}>
              <h3>{col.title}</h3>
              <ul>
                {col.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </FadeSection>
          ))}
        </div>
      </FadeSection>

      {/* ── Publication Ticker ── */}
      <FadeSection delay={0.15}>
        <div className="ticker-wrap">
          <div className="ticker-label">As Seen In</div>
          <div className="ticker-track">
            <div className="ticker-content">
              {['Jerusalem Post', 'New York Sun', 'Business Insider', 'Morning Brew', 'The Center Square', 'American City Business Journals'].flatMap((name, i) => [
                <span key={`a-${i}`}>{name}</span>,
                <span key={`d-a-${i}`} className="ticker-dot">&bull;</span>,
              ])}
              {['Jerusalem Post', 'New York Sun', 'Business Insider', 'Morning Brew', 'The Center Square', 'American City Business Journals'].flatMap((name, i) => [
                <span key={`b-${i}`}>{name}</span>,
                <span key={`d-b-${i}`} className="ticker-dot">&bull;</span>,
              ])}
            </div>
          </div>
        </div>
      </FadeSection>

      <hr className="section-rule double" />

      {/* ── Newsletter ── */}
      <FadeSection className="newsletter-section" delay={0.1}>
        <p className="newsletter-kicker">Dispatches</p>
        <h2 className="newsletter-title">Stay in the Loop</h2>
        <p className="newsletter-desc">
          Occasional updates on new writing, projects, and things worth reading.
          No spam, ever.
        </p>
        <div className="newsletter-form-wrap">
          {submitted ? (
            <p className="newsletter-success">
              Thank you — you&rsquo;re on the list.
            </p>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </FadeSection>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-links">
          <a href="/blog" className="footer-link">The Notebook</a>
          <span className="footer-divider">&middot;</span>
          <a href="https://clubland.us" target="_blank" rel="noopener noreferrer" className="footer-link">Clubland</a>
        </div>
        <p className="footer-text">
          &copy; {today.getFullYear()} Leonard A. Robinson
        </p>
      </footer>
    </div>
  )
}

export default App
