import { useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Parents() {
  useEffect(() => {
    // Scroll animations
    const reveals = document.querySelectorAll('.parents-reveal');
    const handleScroll = () => {
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          reveal.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="parents-section" id="parents">
      <div className="section-container">
        <div className="text-center parents-header-wrap">
          <span className="font-subtitle">The Pillars of Our Lives</span>
          <h2 className="font-title parents-main-title">Our Parents</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="parents-intro font-serif">
            "With the love, guidance, and blessings of our parents, we take our first steps toward forever."
          </p>
        </div>

        <div className="parents-grid grid-two-col">
          {/* Groom's Parents */}
          <div className="parents-column parents-reveal reveal-left">
            <div className="parents-card image-frame">
              <div className="family-illustration-wrap">
                <div className="floral-ring">
                  <Heart className="floral-heart" size={30} />
                </div>
              </div>
              <h3 className="parents-heading font-subtitle">Groom's Parents</h3>
              <div className="parent-names">
                <p className="father-name font-title">Mr. K. Radhakrishnan</p>
                <span className="ampersand-small font-serif">&</span>
                <p className="mother-name font-title">Mrs. Sobhana Radhakrishnan</p>
              </div>
              <div className="parents-blessing">
                <p className="blessing-quote font-serif">
                  "May your life together be woven with threads of endless love, understanding, and shared joy. Our hearts are filled with pride as you unite in this sacred bond."
                </p>
              </div>
            </div>
          </div>

          {/* Bride's Parents */}
          <div className="parents-column parents-reveal reveal-right">
            <div className="parents-card image-frame">
              <div className="family-illustration-wrap">
                <div className="floral-ring">
                  <Heart className="floral-heart" size={30} />
                </div>
              </div>
              <h3 className="parents-heading font-subtitle">Bride's Parents</h3>
              <div className="parent-names">
                <p className="father-name font-title">Mr. M. P. Sivadasan</p>
                <span className="ampersand-small font-serif">&</span>
                <p className="mother-name font-title">Mrs. Geetha Sivadasan</p>
              </div>
              <div className="parents-blessing">
                <p className="blessing-quote font-serif">
                  "As you start your journey hand-in-hand, our prayers and endless blessings will always guide you. May the light of Guruvayoor temple illuminate your paths forever."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .parents-section {
          background-color: var(--color-bg-primary);
          position: relative;
        }

        .parents-header-wrap {
          margin-bottom: 5rem;
        }

        .parents-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .parents-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        .parents-grid {
          max-width: 1000px;
          margin: 0 auto;
        }

        .parents-column {
          display: flex;
          justify-content: center;
        }

        .parents-card {
          width: 100%;
          background: white;
          border-radius: 4px;
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .family-illustration-wrap {
          margin-bottom: 2rem;
          position: relative;
        }

        .floral-ring {
          width: 80px;
          height: 80px;
          border: 1px dashed var(--color-accent-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background-color: var(--color-bg-secondary);
          animation: spin-slow 20s linear infinite;
        }

        .floral-heart {
          color: var(--color-accent-maroon);
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .parents-heading {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 0.5rem;
          width: 80%;
        }

        .parent-names {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .father-name, .mother-name {
          font-size: 1.6rem;
          color: var(--color-accent-maroon);
          font-weight: 500;
        }

        .ampersand-small {
          font-size: 1.2rem;
          color: var(--color-accent-gold-dark);
          margin: 0.25rem 0;
        }

        .parents-blessing {
          border-top: 1px dashed rgba(197, 160, 89, 0.2);
          padding-top: 1.5rem;
          width: 100%;
        }

        .blessing-quote {
          font-size: 0.95rem;
          line-height: 1.8;
          color: var(--color-text-muted);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .parents-main-title {
            font-size: 2.5rem;
          }
          .parents-card {
            padding: 2rem 1.5rem;
          }
          .father-name, .mother-name {
            font-size: 1.35rem;
          }
        }
      `}</style>
    </section>
  );
}
