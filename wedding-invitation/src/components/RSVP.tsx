import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart, MessageSquare, CheckCircle } from 'lucide-react';

interface Wish {
  name: string;
  relation: string;
  message: string;
  date: string;
}

const defaultWishes: Wish[] = [
  {
    name: "Latha Haridas",
    relation: "Aunt",
    message: "Dearest Anudas and Sikhila, wishing you both a lifetime of laughter, matching steps, and endless happiness. Extremely happy for you both!",
    date: "Aug 02, 2026"
  },
  {
    name: "Sandeep Sivadas",
    relation: "Cousin",
    message: "Welcome to the family, Sikhila! Anuda, congratulations bro! Let the celebrations begin. Wishing you a beautiful journey ahead.",
    date: "Aug 02, 2026"
  },
  {
    name: "Dr. Anjali Nair",
    relation: "Close Friend",
    message: "So thrilled to see you two tying the knot! May the deity of Guruvayoor shower you both with abundance and joy. Happy married life guys!",
    date: "Aug 02, 2026"
  }
];

export default function RSVP() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guests, setGuests] = useState('1');
  const [relation, setRelation] = useState('friend');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Load wishes from localStorage, use defaults if empty
    const storedWishes = localStorage.getItem('wedding_wishes');
    if (storedWishes) {
      setWishes(JSON.parse(storedWishes));
    } else {
      setWishes(defaultWishes);
      localStorage.setItem('wedding_wishes', JSON.stringify(defaultWishes));
    }

    // Scroll animations
    const reveals = document.querySelectorAll('.rsvp-reveal');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Fire confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#630F20', '#C5A059', '#E0C99E', '#FCFAF6']
    });

    // Create new wish if message is provided
    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newWish: Wish = {
      name: name.trim(),
      relation: relation.charAt(0).toUpperCase() + relation.slice(1),
      message: message.trim() || (attending === 'yes' ? "Can't wait to celebrate with you!" : "Sending our best wishes and love!"),
      date: dateStr
    };

    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('wedding_wishes', JSON.stringify(updatedWishes));

    // Save RSVP record simulation
    const rsvpRecord = {
      name: name.trim(),
      attending,
      guests: attending === 'yes' ? guests : '0',
      relation,
      message: message.trim(),
      submittedAt: new Date().toISOString()
    };
    
    const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([...existingRSVPs, rsvpRecord]));

    setSubmitted(true);
    
    // Reset form fields
    setName('');
    setMessage('');
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="section-container">
        <div className="text-center rsvp-header-wrap">
          <span className="font-subtitle">Be Our Guest</span>
          <h2 className="font-title rsvp-main-title">RSVP & Wishes</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="rsvp-intro font-serif">
            "Your presence on our special day would complete our happiness. Please let us know if you can join us."
          </p>
        </div>

        <div className="rsvp-grid grid-two-col">
          {/* RSVP Form */}
          <div className="rsvp-form-column rsvp-reveal reveal-left">
            <div className="rsvp-card image-frame">
              <h3 className="form-heading font-title">Will You Attend?</h3>
              <p className="form-subheading">Please respond by December 31, 2026</p>

              {submitted ? (
                <div className="success-message">
                  <CheckCircle className="success-icon" size={48} />
                  <h4 className="font-title">Thank You!</h4>
                  <p>Your response has been received. A shower of blessings has been recorded.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rsvp-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="guest-name">Full Name</label>
                    <input 
                      type="text" 
                      id="guest-name" 
                      className="form-input" 
                      placeholder="Enter your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required 
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="relation">Relation</label>
                      <select 
                        id="relation" 
                        className="form-input select-input"
                        value={relation}
                        onChange={e => setRelation(e.target.value)}
                      >
                        <option value="friend">Friend</option>
                        <option value="family">Family / Relative</option>
                        <option value="colleague">Colleague</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Attendance</label>
                      <div className="radio-group">
                        <label className={`radio-label ${attending === 'yes' ? 'active' : ''}`}>
                          <input 
                            type="radio" 
                            name="attendance" 
                            value="yes" 
                            checked={attending === 'yes'}
                            onChange={() => setAttending('yes')}
                          />
                          Attending
                        </label>
                        <label className={`radio-label ${attending === 'no' ? 'active' : ''}`}>
                          <input 
                            type="radio" 
                            name="attendance" 
                            value="no"
                            checked={attending === 'no'}
                            onChange={() => setAttending('no')}
                          />
                          Declining
                        </label>
                      </div>
                    </div>
                  </div>

                  {attending === 'yes' && (
                    <div className="form-group">
                      <label className="form-label" htmlFor="guests-count">Number of Guests</label>
                      <select 
                        id="guests-count" 
                        className="form-input select-input"
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </select>
                    </div>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="wishes-msg">Your Wishes / Message</label>
                    <textarea 
                      id="wishes-msg" 
                      className="form-textarea" 
                      rows={4} 
                      placeholder="Leave a blessing or message for the couple..."
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn-gold btn-submit-rsvp">
                    <Send size={14} />
                    <span>Send Blessing</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Guestbook Wishes Wall */}
          <div className="wishes-column rsvp-reveal reveal-right">
            <div className="wishes-card image-frame">
              <div className="wishes-card-header">
                <MessageSquare className="wishes-icon" size={24} />
                <h3 className="form-heading font-title">Wishes & Blessings</h3>
                <span className="wishes-counter font-subtitle">{wishes.length} Messages</span>
              </div>

              <div className="wishes-wall">
                {wishes.map((wish, idx) => (
                  <div key={idx} className="wish-sticky-note">
                    <div className="wish-note-header">
                      <div className="wish-sender">
                        <span className="wish-name font-title">{wish.name}</span>
                        <span className="wish-relation font-subtitle">{wish.relation}</span>
                      </div>
                      <span className="wish-date">{wish.date}</span>
                    </div>
                    <p className="wish-text font-serif">"{wish.message}"</p>
                    <Heart className="wish-note-heart" size={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rsvp-section {
          background-color: var(--color-bg-secondary);
          position: relative;
        }

        .rsvp-header-wrap {
          margin-bottom: 4rem;
        }

        .rsvp-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .rsvp-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        .rsvp-card, .wishes-card {
          background: white;
          border-radius: 4px;
          padding: 3rem 2.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .form-heading {
          font-size: 1.8rem;
          color: var(--color-accent-maroon);
          margin-bottom: 0.25rem;
        }

        .form-subheading {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 1.5rem;
        }

        @media (max-width: 480px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent-maroon);
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 0.9rem 1.25rem;
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 4px;
          background-color: var(--color-bg-primary);
          color: var(--color-text-dark);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          transition: var(--transition-fast);
        }

        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--color-accent-maroon);
          box-shadow: 0 4px 15px rgba(99, 15, 32, 0.05);
        }

        .select-input {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23C5A059' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.25rem center;
          padding-right: 2.5rem;
        }

        .radio-group {
          display: flex;
          gap: 0.5rem;
          height: 100%;
        }

        .radio-label {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
          background-color: var(--color-bg-primary);
          user-select: none;
          height: 100%;
          min-height: 42px;
        }

        .radio-label input {
          display: none;
        }

        .radio-label.active {
          background-color: var(--color-accent-maroon);
          color: var(--color-text-light);
          border-color: var(--color-accent-maroon);
        }

        .btn-submit-rsvp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .success-message {
          text-align: center;
          padding: 4rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: fade-in-up 0.5s ease;
        }

        .success-icon {
          color: var(--color-accent-gold);
          margin-bottom: 1.5rem;
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .success-message h4 {
          font-size: 1.8rem;
          margin-bottom: 0.75rem;
        }

        .success-message p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.6;
        }

        /* Wishes column */
        .wishes-card-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }

        .wishes-icon {
          color: var(--color-accent-gold);
          margin-bottom: 0.5rem;
        }

        .wishes-counter {
          font-size: 0.65rem;
          color: var(--color-accent-gold-dark);
          margin-top: 0.25rem;
        }

        .wishes-wall {
          max-height: 400px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-right: 0.5rem;
          scrollbar-width: thin;
        }

        .wish-sticky-note {
          background-color: var(--color-bg-primary);
          border: 1px solid rgba(197, 160, 89, 0.15);
          border-radius: 4px;
          padding: 1.5rem;
          position: relative;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
          transition: var(--transition-fast);
        }

        .wish-sticky-note:hover {
          border-color: var(--color-accent-gold);
          box-shadow: 0 6px 20px rgba(197, 160, 89, 0.08);
          transform: translateY(-2px);
        }

        .wish-note-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .wish-sender {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .wish-name {
          font-size: 1.1rem;
          color: var(--color-accent-maroon);
        }

        .wish-relation {
          font-size: 0.55rem;
          color: var(--color-accent-gold-dark);
        }

        .wish-date {
          font-size: 0.65rem;
          color: var(--color-text-muted);
        }

        .wish-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          font-style: italic;
          text-align: left;
        }

        .wish-note-heart {
          position: absolute;
          bottom: 1rem;
          right: 1.25rem;
          color: rgba(99, 15, 32, 0.15);
          transition: color 0.3s ease;
        }

        .wish-sticky-note:hover .wish-note-heart {
          color: var(--color-accent-maroon);
        }

        @media (max-width: 768px) {
          .rsvp-main-title {
            font-size: 2.5rem;
          }
          .rsvp-card, .wishes-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
