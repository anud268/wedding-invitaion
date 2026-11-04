import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="section-container footer-content-wrap">
        <div className="footer-mandala animate-spin-slow">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="45" strokeDasharray="5 5" />
            <circle cx="50" cy="50" r="35" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
            <polygon points="50,15 55,35 75,35 60,45 65,65 50,55 35,65 40,45 25,35 45,35" />
            <circle cx="50" cy="50" r="8" fill="var(--color-accent-gold)" />
          </svg>
        </div>

        <h3 className="footer-title font-fancy">Anudas & Sikhila</h3>
        <p className="footer-date font-subtitle">10 • 02 • 2027</p>

        <div className="ornamental-divider">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <p className="footer-note font-serif">
          "Thank you for being a part of our story, our joy, and our journey into tomorrow."
        </p>

        <div className="footer-credits">
          <p className="developer-tag">
            Made with <Heart size={10} className="credit-heart" /> for Anudas & Sikhila
          </p>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: var(--color-bg-dark);
          color: var(--color-text-light);
          text-align: center;
          position: relative;
          overflow: hidden;
          padding: 6rem 2rem 3rem;
          border-top: var(--border-gold);
        }

        .footer-content-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .footer-mandala {
          color: rgba(197, 160, 89, 0.4);
          margin-bottom: 2rem;
        }

        .footer-title {
          font-size: 4rem;
          color: var(--color-bg-primary) !important;
          margin-bottom: 0.5rem;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .footer-date {
          color: var(--color-accent-gold) !important;
          font-size: 0.9rem;
          letter-spacing: 0.4em;
          margin-bottom: 1rem;
        }

        .footer-note {
          font-size: 1.2rem;
          color: rgba(252, 250, 246, 0.7);
          line-height: 1.6;
          margin-top: 1rem;
          margin-bottom: 4rem;
          font-style: italic;
        }

        .footer-credits {
          border-top: 1px solid rgba(252, 250, 246, 0.05);
          width: 100%;
          padding-top: 2rem;
        }

        .developer-tag {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(252, 250, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
        }

        .credit-heart {
          color: var(--color-accent-maroon-light);
          fill: var(--color-accent-maroon-light);
          animation: pulse-slow 2s infinite ease-in-out;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .footer-title {
            font-size: 2.8rem;
          }
          .footer-note {
            font-size: 1rem;
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </footer>
  );
}
