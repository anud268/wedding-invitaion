import { useEffect } from 'react';

const stories = [
  {
    year: "The Beginning",
    title: "Strangers in Kochi",
    subtitle: "Where It All Started",
    description: "Our story began with a part-time job in Kochi, where two strangers met and slowly became friends, then best friends. We never knew that the most beautiful chapter of our lives would begin with such a simple meeting.",
    align: "left"
  },
  {
    year: "Growing",
    title: "Best Friends Forever",
    subtitle: "Evening Chai & Endless Conversations",
    description: "As time passed, we both found new jobs, but she never forgot to stay in touch. Our friendship grew through countless conversations, evening chai and snacks on the streets of Kochi, and little moments that quietly became the most precious memories of our lives.",
    align: "right"
  },
  {
    year: "The Turn",
    title: "Love in Disguise",
    subtitle: "When Distance Became the Bridge",
    description: "Then came the day when we had to leave Kochi and move to two different places. Somewhere between the sadness of being apart and the fear of losing each other, a new feeling began to bloom. We didn't know whether it was the pain of separation or the beginning of love — eventually, we realized it was both.",
    align: "left"
  },
  {
    year: "Two Years",
    title: "The Promise We Kept",
    subtitle: "Patience, Hope & Courage",
    description: "It took us two years to convince our families and turn our love into a promise. There were challenges, patience, and countless hopes — but we never gave up on each other. Every difficulty only made us more certain that we were meant to be.",
    align: "right"
  },
  {
    year: "Forever",
    title: "Before Guruvayurappan",
    subtitle: "Tying the Thali at Guruvayur Temple",
    description: "Now, our beautiful journey brings us to Guruvayur Temple, where before Guruvayurappan, we are about to tie the thali and begin our forever. We met as strangers, became best friends, fell in love unknowingly, and chose each other for a lifetime.",
    align: "left"
  }
];

export default function Story() {
  useEffect(() => {
    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.story-reveal');
    
    const handleScroll = () => {
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initially
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="story-section" id="story">
      <div className="section-container">
        <div className="text-center story-header-wrap">
          <span className="font-subtitle">Our Journey</span>
          <h2 className="font-title story-main-title">Our Love Story</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="story-intro font-serif">
            "A marriage is not just two individuals coming together, but two stories merging into one beautiful book."
          </p>
        </div>

        {/* Prose Narrative Block */}
        <div className="story-prose-wrap story-reveal">
          <div className="story-prose-inner">
            <div className="story-prose-icon">❝</div>
            <p className="story-prose-text">
              What began as a <span className="story-prose-highlight">part-time job in Kochi</span> is now becoming a{' '}
              <span className="story-prose-highlight">full-time love story</span> — one that will last forever.
              We met as strangers, became best friends, fell in love without even knowing when it happened,
              and now, with the blessings of Guruvayurappan, we choose each other for a lifetime.
            </p>
            <div className="story-prose-icon story-prose-icon-close">❞</div>
          </div>
        </div>

        <div className="timeline-container">
          {/* Vertical Center Line */}
          <div className="timeline-center-line" />

          <div className="timeline-items">
            {stories.map((story, idx) => (
              <div 
                key={idx} 
                className={`timeline-item ${story.align === 'left' ? 'item-left' : 'item-right'} story-reveal`}
              >
                <div className="timeline-dot">
                  <div className="timeline-dot-inner" />
                </div>
                
                <div className="timeline-content-card">
                  <div className="timeline-year font-title">{story.year}</div>
                  <h3 className="timeline-title font-title">{story.title}</h3>
                  <h4 className="timeline-subtitle font-subtitle">{story.subtitle}</h4>
                  <p className="timeline-desc">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .story-section {
          background-color: var(--color-bg-primary);
          position: relative;
          overflow: hidden;
        }

        .story-header-wrap {
          margin-bottom: 5rem;
        }

        .story-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .story-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        /* Prose Narrative Block */
        .story-prose-wrap {
          max-width: 760px;
          margin: 0 auto 5rem;
          padding: 0 1rem;
        }

        .story-prose-inner {
          background: linear-gradient(135deg, rgba(197,160,89,0.06) 0%, rgba(139,0,0,0.04) 100%);
          border: 1px solid rgba(197,160,89,0.25);
          border-radius: 8px;
          padding: 2.5rem 3rem;
          position: relative;
          text-align: center;
        }

        .story-prose-icon {
          font-family: Georgia, serif;
          font-size: 3rem;
          color: var(--color-accent-gold);
          opacity: 0.5;
          line-height: 1;
          display: block;
          margin-bottom: 0.5rem;
        }

        .story-prose-icon-close {
          margin-top: 0.5rem;
          margin-bottom: 0;
        }

        .story-prose-text {
          font-family: 'Georgia', serif;
          font-size: 1.1rem;
          color: var(--color-text-muted);
          line-height: 1.95;
          font-style: italic;
          margin: 0;
        }

        .story-prose-highlight {
          color: var(--color-accent-maroon);
          font-style: normal;
          font-weight: 600;
        }

        /* Timeline structure */
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-center-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 1px;
          background: linear-gradient(
            to bottom, 
            transparent 0%, 
            rgba(197, 160, 89, 0.4) 15%, 
            rgba(197, 160, 89, 0.4) 85%, 
            transparent 100%
          );
          transform: translateX(-50%);
        }

        .timeline-items {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .timeline-item {
          display: flex;
          position: relative;
          width: 100%;
        }

        /* Timeline Dot */
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 40px;
          width: 20px;
          height: 20px;
          background-color: var(--color-bg-primary);
          border: 1px solid var(--color-accent-gold);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: var(--transition-smooth);
        }

        .timeline-dot-inner {
          width: 8px;
          height: 8px;
          background-color: var(--color-accent-gold);
          border-radius: 50%;
          transition: var(--transition-smooth);
        }

        .timeline-item:hover .timeline-dot {
          background-color: var(--color-accent-maroon);
          border-color: var(--color-accent-maroon);
        }

        .timeline-item:hover .timeline-dot-inner {
          background-color: var(--color-bg-primary);
          transform: scale(1.2);
        }

        /* Timeline Content Card */
        .timeline-content-card {
          width: 44%;
          background: white;
          border: var(--border-gold);
          padding: 2.5rem;
          position: relative;
          box-shadow: var(--shadow-subtle);
          transition: var(--transition-smooth);
          border-radius: 4px;
        }

        .timeline-content-card::after {
          content: '';
          position: absolute;
          top: 30px;
          width: 10px;
          height: 10px;
          background-color: white;
          border-style: solid;
          border-color: rgba(197, 160, 89, 0.2);
          transform: rotate(45deg);
        }

        .item-left {
          justify-content: flex-start;
        }

        .item-left .timeline-content-card {
          transform: translateX(-15px);
        }

        .item-left .timeline-content-card::after {
          right: -6px;
          border-width: 1px 1px 0 0;
        }

        .item-right {
          justify-content: flex-end;
        }

        .item-right .timeline-content-card {
          transform: translateX(15px);
        }

        .item-right .timeline-content-card::after {
          left: -6px;
          border-width: 0 0 1px 1px;
        }

        .timeline-content-card:hover {
          box-shadow: var(--shadow-medium);
          transform: translateY(-5px);
          border-color: var(--color-accent-gold);
        }

        .timeline-year {
          font-size: 2.2rem;
          color: var(--color-accent-gold);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .timeline-title {
          font-size: 1.6rem;
          color: var(--color-accent-maroon);
          margin-bottom: 0.25rem;
        }

        .timeline-subtitle {
          margin-bottom: 1.25rem;
          color: var(--color-text-muted);
          font-size: 0.7rem;
        }

        .timeline-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.8;
          font-weight: 300;
        }

        /* Scroll Animations */
        .story-reveal {
          opacity: 0;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .item-left.story-reveal {
          transform: translateX(-50px);
        }

        .item-right.story-reveal {
          transform: translateX(50px);
        }

        .story-reveal.active {
          opacity: 1;
          transform: translateX(0);
        }

        /* Responsive Mobile Layout */
        @media (max-width: 768px) {
          .timeline-center-line {
            left: 20px;
          }

          .timeline-dot {
            left: 20px;
          }

          .timeline-item {
            justify-content: flex-end;
          }

          .timeline-content-card {
            width: calc(100% - 50px);
            padding: 1.5rem;
            transform: none !important;
          }

          .timeline-content-card::after {
            left: -6px !important;
            right: auto !important;
            border-width: 0 0 1px 1px !important;
          }

          .timeline-year {
            font-size: 1.8rem;
          }

          .timeline-title {
            font-size: 1.3rem;
          }

          .story-main-title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
