import { useEffect } from 'react';
import { Camera, Compass, Code, Palette, BookOpen, Music, Heart } from 'lucide-react';

const groomHobbies = [
  {
    icon: <Camera className="hobby-icon" size={24} />,
    name: "Photography",
    desc: "Freezing stories in light and shadow, especially landscape and architecture frames."
  },
  {
    icon: <Compass className="hobby-icon" size={24} />,
    name: "Wanderlust",
    desc: "Exploring uncharted trails, mist-laden mountains, and traditional towns."
  },
  {
    icon: <Code className="hobby-icon" size={24} />,
    name: "Creative Coding",
    desc: "Designing and building beautiful, interactive canvas experiences on the web."
  }
];

const brideHobbies = [
  {
    icon: <Palette className="hobby-icon" size={24} />,
    name: "Acrylic Painting",
    desc: "Translating thoughts and traditional Kerala aesthetics onto canvases with rich colors."
  },
  {
    icon: <BookOpen className="hobby-icon" size={24} />,
    name: "Classic Literature",
    desc: "Getting lost in tales of old, historic narratives, and classical poetry."
  },
  {
    icon: <Music className="hobby-icon" size={24} />,
    name: "Classical Dance",
    desc: "Expressing emotions and heritage stories through graceful traditional mudras."
  }
];

export default function Hobbies() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.hobby-reveal');
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
    <section className="hobbies-section" id="hobbies">
      <div className="section-container">
        <div className="text-center hobbies-header-wrap">
          <span className="font-subtitle">Two Worlds, One Heart</span>
          <h2 className="font-title hobbies-main-title">Our Hobbies</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="hobbies-intro font-serif">
            "Before our stories merged, we found joy in these individual colors. Together, we paint a new canvas."
          </p>
        </div>

        <div className="editorial-grid">
          {/* Column 1: Groom */}
          <div className="editorial-col groom-col hobby-reveal reveal-left">
            <div className="col-header">
              <span className="gender-tag">His Side</span>
              <h3 className="column-title font-title">Anudas</h3>
              <p className="column-desc font-serif">The quiet developer who finds art in structure, travel, and frames.</p>
            </div>
            
            <div className="hobbies-list">
              {groomHobbies.map((hobby, idx) => (
                <div key={idx} className="hobby-card">
                  <div className="icon-wrapper-gold">{hobby.icon}</div>
                  <div className="hobby-card-content">
                    <h4 className="hobby-name font-title">{hobby.name}</h4>
                    <p className="hobby-desc">{hobby.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Shared passions (Middle visual card) */}
          <div className="editorial-col shared-col hobby-reveal reveal-scale">
            <div className="shared-passions-card image-frame">
              <div className="shared-card-inner">
                <Heart className="shared-heart-icon" size={36} />
                <h3 className="shared-title font-title">Our Shared Passions</h3>
                <span className="shared-subtitle font-subtitle">Where We Meet</span>
                <ul className="shared-list font-serif">
                  <li>
                    <span className="list-gold-dot">•</span>
                    Exploring quiet, misty hill stations in the Western Ghats.
                  </li>
                  <li>
                    <span className="list-gold-dot">•</span>
                    Savoring traditional filter coffee and discussing music.
                  </li>
                  <li>
                    <span className="list-gold-dot">•</span>
                    Wandering through old libraries and local antique bazaars.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Bride */}
          <div className="editorial-col bride-col hobby-reveal reveal-right">
            <div className="col-header">
              <span className="gender-tag">Her Side</span>
              <h3 className="column-title font-title">Sikhila</h3>
              <p className="column-desc font-serif">The expressive artist who finds harmony in dance, colors, and books.</p>
            </div>

            <div className="hobbies-list">
              {brideHobbies.map((hobby, idx) => (
                <div key={idx} className="hobby-card">
                  <div className="icon-wrapper-gold">{hobby.icon}</div>
                  <div className="hobby-card-content">
                    <h4 className="hobby-name font-title">{hobby.name}</h4>
                    <p className="hobby-desc">{hobby.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hobbies-section {
          background-color: var(--color-bg-secondary);
          position: relative;
        }

        .hobbies-header-wrap {
          margin-bottom: 5rem;
        }

        .hobbies-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .hobbies-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        /* Editorial Magazine Grid Layout */
        .editorial-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.8fr 1.1fr;
          gap: 3rem;
          align-items: stretch;
          max-width: 1100px;
          margin: 0 auto;
        }

        .editorial-col {
          display: flex;
          flex-direction: column;
          background: white;
          border: var(--border-gold);
          border-radius: 4px;
          padding: 3rem 2rem;
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
        }

        .editorial-col:hover {
          box-shadow: var(--shadow-medium);
          border-color: var(--color-accent-gold);
        }

        .col-header {
          margin-bottom: 2.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 1.5rem;
        }

        .gender-tag {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-accent-gold-dark);
          display: block;
          margin-bottom: 0.5rem;
        }

        .column-title {
          font-size: 2.2rem;
          color: var(--color-accent-maroon);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .column-desc {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          font-style: italic;
        }

        .hobbies-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .hobby-card {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .icon-wrapper-gold {
          background-color: var(--color-bg-secondary);
          border: 1px solid rgba(197, 160, 89, 0.4);
          color: var(--color-accent-maroon);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: var(--transition-fast);
        }

        .hobby-card:hover .icon-wrapper-gold {
          background-color: var(--color-accent-maroon);
          color: var(--color-bg-primary);
          border-color: var(--color-accent-maroon);
          transform: translateY(-3px);
        }

        .hobby-name {
          font-size: 1.25rem;
          color: var(--color-accent-maroon);
          margin-bottom: 0.25rem;
        }

        .hobby-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          font-weight: 300;
        }

        /* Shared Card Middle */
        .shared-col {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .shared-col:hover {
          box-shadow: none;
        }

        .shared-passions-card {
          width: 100%;
          height: 100%;
          background-color: var(--color-accent-maroon) !important;
          color: var(--color-text-light);
          padding: 2.5rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .shared-card-inner {
          text-align: center;
          border: 1px dashed rgba(252, 250, 246, 0.2);
          padding: 2rem 1rem;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .shared-heart-icon {
          color: var(--color-accent-gold-light);
          margin-bottom: 1.5rem;
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .shared-title {
          color: var(--color-bg-primary) !important;
          font-size: 1.8rem;
          margin-bottom: 0.25rem;
        }

        .shared-subtitle {
          color: var(--color-accent-gold-light) !important;
          margin-bottom: 2rem;
          font-size: 0.65rem;
          display: block;
        }

        .shared-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          text-align: left;
          list-style: none;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(252, 250, 246, 0.85);
          font-style: italic;
        }

        .shared-list li {
          position: relative;
          padding-left: 1.5rem;
        }

        .list-gold-dot {
          color: var(--color-accent-gold-light);
          font-size: 1.5rem;
          position: absolute;
          left: 0;
          top: -0.2rem;
          line-height: 1;
        }

        @media (max-width: 991px) {
          .editorial-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .shared-passions-card {
            padding: 3rem 2rem;
          }
        }

        @media (max-width: 768px) {
          .hobbies-main-title {
            font-size: 2.5rem;
          }
          .column-title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
}
