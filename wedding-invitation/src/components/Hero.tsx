import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isOver: boolean;
}

export default function Hero() {
  const weddingDate = new Date('2027-02-10T08:00:00+05:30'); // Guruvayoor wedding time (e.g. morning)
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +weddingDate - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: false };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false
      };
    } else {
      timeLeft.isOver = true;
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="home">
      {/* Background Image Container with Parallax Effect */}
      <div className="hero-bg">
        <div className="hero-overlay" />
      </div>

      {/* Decorative Gold Borders */}
      <div className="gold-corners hero-corners-container">
        <div className="gold-corners-inner" />
      </div>

      <div className="hero-content">
        <p className="hero-tagline font-subtitle animate-fade-in-delayed">
          Save the Date
        </p>

        <div className="hero-names-container">
          <h1 className="hero-name groom-name">Anudas</h1>
          <span className="hero-ampersand font-fancy">&</span>
          <h1 className="hero-name bride-name">Sikhila</h1>
        </div>

        <div className="ornamental-divider">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 12l10 10 10-10L12 2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <p className="hero-details font-title-sub text-gold-glow">
          10th February 2027 • Guruvayoor Temple, Thrissur
        </p>

        {/* Countdown Timer */}
        {!timeLeft.isOver ? (
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-num font-title">{timeLeft.days}</span>
              <span className="countdown-label">Days</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-item">
              <span className="countdown-num font-title">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="countdown-label">Hours</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-item">
              <span className="countdown-num font-title">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="countdown-label">Mins</span>
            </div>
            <div className="countdown-colon">:</div>
            <div className="countdown-item">
              <span className="countdown-num font-title">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="countdown-label">Secs</span>
            </div>
          </div>
        ) : (
          <div className="wedding-started-msg font-title">
            Together Forever since Feb 10, 2027
          </div>
        )}

        <div className="scroll-hint-wrapper">
          <a href="#story" className="scroll-btn">
            <span className="scroll-btn-text">Scroll to Reveal</span>
            <div className="scroll-line-indicator" />
          </a>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-bg-dark);
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url('/assets/hero_bg.png');
          background-size: cover;
          background-position: center 30%;
          animation: zoom-slow 20s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes zoom-slow {
          from { transform: scale(1.02); }
          to { transform: scale(1.08); }
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(18, 18, 18, 0.7) 0%,
            rgba(99, 15, 32, 0.25) 50%,
            rgba(18, 18, 18, 0.85) 100%
          );
        }

        .hero-corners-container {
          position: absolute;
          inset: 2rem;
          border: 1px solid rgba(197, 160, 89, 0.15);
          pointer-events: none;
          z-index: 3;
        }

        .hero-content {
          position: relative;
          z-index: 4;
          text-align: center;
          color: var(--color-text-light);
          max-width: 800px;
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-tagline {
          color: var(--color-accent-gold-light);
          margin-bottom: 1.5rem;
          opacity: 0;
          transform: translateY(20px);
          animation: fade-in-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.3s;
        }

        .hero-names-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1rem;
        }

        .hero-name {
          font-family: var(--font-serif);
          font-size: 5.5rem;
          font-weight: 300;
          line-height: 1;
          letter-spacing: 0.02em;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
          opacity: 0;
          transform: translateY(30px);
          color: var(--color-bg-primary);
        }

        .groom-name {
          animation: fade-in-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.6s;
        }

        .bride-name {
          animation: fade-in-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.2s;
        }

        .hero-ampersand {
          font-size: 4rem;
          margin: 0.5rem 0;
          opacity: 0;
          transform: scale(0.8);
          animation: scale-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 0.9s;
          color: var(--color-accent-gold-light);
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        @keyframes scale-up {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hero-details {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
          letter-spacing: 0.05em;
          color: var(--color-bg-secondary);
          margin-top: 1rem;
          margin-bottom: 2.5rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: fade-in 2s ease forwards;
          animation-delay: 1.5s;
        }

        .text-gold-glow {
          color: #F6F2E9;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 0.75rem;
        }

        /* Countdown */
        .countdown-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 1rem;
          background: rgba(18, 18, 18, 0.4);
          padding: 1.25rem 2.5rem;
          border-radius: 4px;
          border: 1px solid rgba(197, 160, 89, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: fade-in-up 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: 1.8s;
        }

        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 60px;
        }

        .countdown-num {
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-accent-gold-light) !important;
          line-height: 1;
        }

        .countdown-label {
          font-size: 0.65rem;
          font-family: var(--font-sans);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(252, 250, 246, 0.6);
          margin-top: 0.5rem;
        }

        .countdown-colon {
          font-family: var(--font-serif);
          font-size: 1.8rem;
          color: var(--color-accent-gold-light);
          padding-bottom: 1rem;
        }

        .wedding-started-msg {
          font-size: 1.5rem;
          color: var(--color-accent-gold);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Scroll Hint */
        .scroll-hint-wrapper {
          position: absolute;
          bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          animation: fade-in 2s ease forwards;
          animation-delay: 2.2s;
        }

        .scroll-btn {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-accent-gold-light);
          transition: color 0.3s ease;
        }

        .scroll-btn:hover {
          color: var(--color-bg-primary);
        }

        .scroll-btn-text {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .scroll-line-indicator {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--color-accent-gold) 0%, transparent 100%);
          position: relative;
          overflow: hidden;
        }

        .scroll-line-indicator::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20px;
          background: var(--color-bg-primary);
          animation: scroll-dot 2s infinite cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scroll-dot {
          0% { transform: translateY(-20px); }
          100% { transform: translateY(50px); }
        }

        @keyframes fade-in {
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-name {
            font-size: 3.8rem;
          }
          .hero-ampersand {
            font-size: 2.8rem;
          }
          .hero-details {
            font-size: 1.1rem;
          }
          .countdown-container {
            padding: 1rem 1.5rem;
            gap: 0.8rem;
          }
          .countdown-item {
            min-width: 45px;
          }
          .countdown-num {
            font-size: 1.8rem;
          }
          .countdown-label {
            font-size: 0.55rem;
          }
        }
      `}</style>
    </section>
  );
}
