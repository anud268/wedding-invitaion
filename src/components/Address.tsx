import { useEffect } from 'react';
import { MapPin, Calendar, Clock, Navigation } from 'lucide-react';

export default function Address() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.address-reveal');
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

  // Helper to generate Google Calendar links
  const getGoogleCalendarLink = (event: 'wedding' | 'reception') => {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    
    if (event === 'wedding') {
      const text = encodeURIComponent('Wedding Ceremony: Anudas & Sikhila');
      const dates = '20270210T030000Z/20270210T063000Z'; // 10th Feb 2027 (8:30 AM to 12:00 PM IST)
      const details = encodeURIComponent('Please join us as we tie the knot at Guruvayoor Temple.');
      const location = encodeURIComponent('Guruvayoor Sree Krishna Temple, Guruvayur, Kerala, India');
      return `${baseUrl}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    } else {
      const text = encodeURIComponent('Wedding Reception: Anudas & Sikhila');
      const dates = '20270214T113000Z/20270214T170000Z'; // 14th Feb 2027 (5:00 PM to 10:30 PM IST)
      const details = encodeURIComponent('Celebrate with us at our wedding reception in Palakkad.');
      const location = encodeURIComponent('Palakkad, Kerala, India');
      return `${baseUrl}&text=${text}&dates=${dates}&details=${details}&location=${location}`;
    }
  };

  return (
    <section className="address-section" id="address">
      <div className="section-container">
        <div className="text-center address-header-wrap">
          <span className="font-subtitle">Where & When</span>
          <h2 className="font-title address-main-title">Events & Venues</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="address-intro font-serif">
            "We would be honored by your presence and blessings as we begin our journey together."
          </p>
        </div>

        <div className="venues-grid grid-two-col">
          {/* Card 1: Wedding */}
          <div className="venue-card-wrapper address-reveal reveal-left">
            <div className="venue-card image-frame">
              <div className="venue-badge font-subtitle">The Wedding</div>
              
              <div className="venue-content">
                <h3 className="venue-title font-title">Muhurtham</h3>
                
                <div className="venue-details-list">
                  <div className="detail-item">
                    <Calendar className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Date</p>
                      <p className="detail-val">Wednesday, February 10, 2027</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Clock className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Time</p>
                      <p className="detail-val">8:30 AM – 10:30 AM</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <MapPin className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Location</p>
                      <p className="detail-val">Guruvayoor Sree Krishna Temple</p>
                      <p className="detail-subval">East Nada, Guruvayur, Thrissur, Kerala</p>
                    </div>
                  </div>
                </div>

                <div className="venue-actions">
                  <a 
                    href="https://maps.google.com/?q=Guruvayur+Sree+Krishna+Temple" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="venue-btn nav-btn"
                  >
                    <Navigation size={16} />
                    <span>Navigate</span>
                  </a>
                  <a 
                    href={getGoogleCalendarLink('wedding')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="venue-btn cal-btn"
                  >
                    <Calendar size={16} />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Reception */}
          <div className="venue-card-wrapper address-reveal reveal-right">
            <div className="venue-card image-frame">
              <div className="venue-badge font-subtitle">The Reception</div>
              
              <div className="venue-content">
                <h3 className="venue-title font-title">Celebration</h3>
                
                <div className="venue-details-list">
                  <div className="detail-item">
                    <Calendar className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Date</p>
                      <p className="detail-val">Sunday, February 14, 2027</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Clock className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Time</p>
                      <p className="detail-val">4:00 PM Onwards</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <MapPin className="detail-icon" size={20} />
                    <div className="detail-text">
                      <p className="detail-label">Location</p>
                      <p className="detail-val">Palakkad Fine Arts Society Hall</p>
                      <p className="detail-subval">Town Hall Road, Palakkad, Kerala</p>
                    </div>
                  </div>
                </div>

                <div className="venue-actions">
                  <a 
                    href="https://maps.google.com/?q=Palakkad+Kerala" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="venue-btn nav-btn"
                  >
                    <Navigation size={16} />
                    <span>Navigate</span>
                  </a>
                  <a 
                    href={getGoogleCalendarLink('reception')} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="venue-btn cal-btn"
                  >
                    <Calendar size={16} />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .address-section {
          background-color: var(--color-bg-primary);
          position: relative;
        }

        .address-header-wrap {
          margin-bottom: 5rem;
        }

        .address-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .address-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        .venues-grid {
          max-width: 1000px;
          margin: 0 auto;
        }

        .venue-card-wrapper {
          display: flex;
          justify-content: center;
        }

        .venue-card {
          width: 100%;
          background: white;
          border-radius: 4px;
          padding: 3rem 2.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .venue-badge {
          align-self: flex-start;
          background-color: var(--color-bg-secondary);
          color: var(--color-accent-maroon);
          padding: 0.5rem 1.25rem;
          border-radius: 30px;
          font-size: 0.65rem;
          font-weight: 600;
          margin-bottom: 2rem;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }

        .venue-title {
          font-size: 2.2rem;
          color: var(--color-accent-maroon);
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
          padding-bottom: 0.5rem;
        }

        .venue-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .detail-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .detail-icon {
          color: var(--color-accent-gold);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }

        .detail-text {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-text-muted);
          margin-bottom: 0.25rem;
          font-weight: 500;
        }

        .detail-val {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--color-text-dark);
          line-height: 1.3;
        }

        .detail-subval {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
          line-height: 1.4;
          font-weight: 300;
        }

        /* Buttons actions */
        .venue-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .venue-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.9rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
          text-decoration: none;
          border-radius: 4px;
          transition: var(--transition-smooth);
        }

        .nav-btn {
          background-color: var(--color-accent-maroon);
          color: var(--color-text-light);
          border: 1px solid var(--color-accent-maroon);
        }

        .nav-btn:hover {
          background-color: var(--color-accent-maroon-light);
          border-color: var(--color-accent-maroon-light);
          box-shadow: var(--shadow-medium);
          transform: translateY(-2px);
        }

        .cal-btn {
          background-color: transparent;
          color: var(--color-accent-maroon);
          border: var(--border-gold-heavy);
        }

        .cal-btn:hover {
          background-color: var(--color-bg-secondary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .address-main-title {
            font-size: 2.5rem;
          }
          .venue-card {
            padding: 2rem 1.5rem;
          }
          .venue-title {
            font-size: 1.8rem;
          }
          .venue-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
