import { useState, useEffect } from 'react'
import { addToWaitlist } from '../lib/db'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    document.title = 'Vantage — Intelligence for the Ambitious Law Student'
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const { error } = await addToWaitlist(email)

    if (error) {
      setStatus('error')
      if (error.code === '23505') {
        setErrorMsg("You're already on the list.")
      } else {
        setErrorMsg('Something went wrong. Try again.')
      }
    } else {
      setStatus('success')
    }
  }

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <header style={styles.topBar}>
        <div style={styles.wordmark}>Vantage</div>
        <div style={styles.topBarRight}>Early Access · Free</div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        {/* Left Column */}
        <div style={styles.leftCol}>
          <div style={styles.eyebrow}>
            <span style={styles.goldDot} />
            Now accepting waitlist signups
          </div>

          <h1 style={styles.headline}>
            Intelligence for the ambitious<br />
            <em style={styles.headlineItalic}>law student.</em>
          </h1>

          <p style={styles.subhead}>
            The weekly brief covering firm intelligence, recruiting strategy, and everything
            your career services office won't tell you. Join the waitlist and get free access
            to Atlas when it launches.
          </p>

          {status === 'success' ? (
            <p style={styles.successMsg}>
              You're on the list. First issue drops soon. — Vantage
            </p>
          ) : (
            <>
              <label style={styles.formLabel}>Your law school email</label>
              <form onSubmit={handleSubmit} style={styles.inputRow}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@law.school.edu"
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={styles.submitBtn}
                >
                  {status === 'submitting' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              <p style={styles.disclaimer}>
                Free forever · Unsubscribe anytime · Atlas early access included
              </p>
              {status === 'error' && (
                <p style={styles.errorMsg}>{errorMsg}</p>
              )}
            </>
          )}
        </div>

        {/* Right Column */}
        <div style={styles.rightCol}>
          <div style={styles.cardsContainer}>
            {/* Card 1 */}
            <div style={styles.card1}>
              <div style={styles.cardTag}>Intelligence Brief</div>
              <div style={styles.card1Title}>King &amp; Spalding</div>
              <div style={styles.card1Location}>Atlanta, GA</div>
              <p style={styles.card1Body}>
                Known for its top-tier FDA practice and deep Southern roots, King &amp; Spalding
                recruits heavily from Emory and Georgia Law...
              </p>
              <span style={styles.card1Badge}>1L Program</span>
            </div>

            {/* Card 2 */}
            <div style={styles.card2}>
              <div style={styles.card2Tag}>Cover Letter · Generated</div>
              <div style={styles.card2Title}>Latham &amp; Watkins</div>
              <p style={styles.card2Body}>
                I am writing to express my interest in the 2026 Summer Associate position
                in your Chicago office. After speaking with partners at OCI...
              </p>
            </div>

            {/* Card 3 */}
            <div style={styles.card3}>
              <div style={styles.cardTag}>Atlas Data · This Week</div>
              <div style={styles.card3Number}>Georgia</div>
              <div style={styles.card3Label}>Most targeted market by 1Ls</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <div style={styles.divider} />
      <section style={styles.statsRow}>
        {[
          { number: '400+', label: 'Firms indexed' },
          { number: '28', label: 'Markets covered' },
          { number: 'Weekly', label: 'Intelligence drops' },
          { number: 'Free', label: 'To join' },
        ].map((stat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
            {i > 0 && <div style={styles.verticalLine} />}
            <div>
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* What You Get */}
      <div style={styles.divider} />
      <section style={styles.whatYouGet}>
        <div style={styles.sectionTag}>
          <span style={styles.goldDot} />
          What you get
        </div>
        <div style={styles.threeCol}>
          {[
            {
              num: '01',
              title: 'Firm intelligence',
              body: 'A deep dive on one firm every week. Culture, recruiting, what actually gets you the offer. Sourced from Atlas data and original reporting.',
            },
            {
              num: '02',
              title: 'Recruiting strategy',
              body: "The tactical intel your career services office will never give you. Cold outreach, deadlines, application windows, what partners actually look for.",
            },
            {
              num: '03',
              title: 'Atlas early access',
              body: 'Waitlist subscribers get free access to Atlas when it launches — 400+ firms, AI briefs, and document generation built for 1Ls.',
            },
          ].map((item) => (
            <div key={item.num}>
              <div style={styles.itemNum}>{item.num}</div>
              <div style={styles.itemTitle}>{item.title}</div>
              <p style={styles.itemBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerWordmark}>Vantage</div>
        <div style={styles.footerCenter}>
          © 2025 Vantage · Intelligence for the ambitious law student
        </div>
        <div style={styles.footerRight}>Powered by Atlas →</div>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    background: '#0c0f1a',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },

  // Top Bar
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
  },
  wordmark: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '20px',
    fontWeight: 300,
    color: '#fff',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
  },
  topBarRight: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#b8973a',
  },

  // Hero
  hero: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '5rem 3rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
  },

  // Left Column
  leftCol: {},
  eyebrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.25em',
    color: '#b8973a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '1.5rem',
  },
  goldDot: {
    display: 'inline-block',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: '#b8973a',
    flexShrink: 0,
  },
  headline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '54px',
    fontWeight: 300,
    color: '#fff',
    lineHeight: 1.0,
    margin: '0 0 1.5rem 0',
  },
  headlineItalic: {
    color: '#b8973a',
    fontStyle: 'italic',
  },
  subhead: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '16px',
    fontStyle: 'italic',
    color: '#5a6080',
    lineHeight: 1.75,
    marginBottom: '2.5rem',
  },
  formLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: '#b8973a',
    display: 'block',
    marginBottom: '8px',
  },
  inputRow: {
    display: 'flex',
    border: '1px solid rgba(184,151,58,0.3)',
  },
  input: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '14px 18px',
    fontFamily: "'EB Garamond', serif",
    fontSize: '15px',
    color: '#fff',
  },
  submitBtn: {
    background: '#b8973a',
    border: 'none',
    padding: '14px 24px',
    fontFamily: "'DM Mono', monospace",
    fontSize: '9px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#0c0f1a',
    cursor: 'pointer',
  },
  disclaimer: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    color: '#3a4060',
    letterSpacing: '0.1em',
    marginTop: '10px',
  },
  successMsg: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '20px',
    fontStyle: 'italic',
    color: '#b8973a',
  },
  errorMsg: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#8a4a4a',
    marginTop: '8px',
  },

  // Right Column
  rightCol: {},
  cardsContainer: {
    position: 'relative',
    height: '380px',
  },
  card1: {
    position: 'absolute',
    top: 0,
    right: '20px',
    width: '280px',
    background: '#111525',
    border: '1px solid rgba(184,151,58,0.2)',
    padding: '1.5rem',
  },
  cardTag: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    textTransform: 'uppercase',
    color: '#b8973a',
    marginBottom: '6px',
  },
  card1Title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '17px',
    color: '#fff',
  },
  card1Location: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    textTransform: 'uppercase',
    color: '#3a4060',
    marginTop: '2px',
  },
  card1Body: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '12px',
    fontStyle: 'italic',
    color: '#5a6080',
    marginTop: '10px',
    lineHeight: 1.5,
  },
  card1Badge: {
    display: 'inline-block',
    border: '1px solid #b8973a',
    color: '#b8973a',
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    textTransform: 'uppercase',
    padding: '3px 8px',
    marginTop: '10px',
  },
  card2: {
    position: 'absolute',
    top: '70px',
    right: '60px',
    width: '260px',
    background: '#f5f0e8',
    padding: '1.5rem',
  },
  card2Tag: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    textTransform: 'uppercase',
    color: '#8b6914',
    marginBottom: '6px',
  },
  card2Title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '15px',
    color: '#0c0f1a',
  },
  card2Body: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '12px',
    fontStyle: 'italic',
    color: '#4a4a5a',
    marginTop: '6px',
    lineHeight: 1.5,
  },
  card3: {
    position: 'absolute',
    top: '160px',
    right: '10px',
    width: '240px',
    background: '#0c0f1a',
    border: '1px solid rgba(184,151,58,0.3)',
    padding: '1.5rem',
  },
  card3Number: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '36px',
    fontWeight: 300,
    color: '#b8973a',
  },
  card3Label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    textTransform: 'uppercase',
    color: '#3a4060',
    marginTop: '4px',
  },

  // Stats
  divider: {
    borderTop: '1px solid rgba(184,151,58,0.08)',
  },
  statsRow: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '2.5rem 3rem',
    display: 'flex',
    gap: '4rem',
  },
  verticalLine: {
    width: '1px',
    height: '30px',
    background: 'rgba(184,151,58,0.15)',
  },
  statNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '32px',
    fontWeight: 300,
    color: '#b8973a',
  },
  statLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    color: '#3a4060',
  },

  // What You Get
  whatYouGet: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '3rem',
  },
  sectionTag: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    textTransform: 'uppercase',
    color: '#b8973a',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '2rem',
  },
  threeCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
  },
  itemNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '40px',
    color: '#1a2040',
  },
  itemTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '18px',
    color: '#fff',
    marginBottom: '8px',
  },
  itemBody: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#3a4060',
    lineHeight: 1.7,
  },

  // Footer
  footer: {
    padding: '1.5rem 3rem',
    borderTop: '1px solid rgba(184,151,58,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerWordmark: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '14px',
    color: '#fff',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  footerCenter: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    color: '#2a3050',
    textTransform: 'uppercase',
  },
  footerRight: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '7px',
    color: '#b8973a',
    textTransform: 'uppercase',
  },
}
