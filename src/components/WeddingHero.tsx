import React from 'react';
import { weddingConfig } from '../weddingConfig';

interface WeddingHeroProps {
  onOpenInvitation: () => void;
}

const WeddingHero: React.FC<WeddingHeroProps> = ({ onOpenInvitation }) => {
  const { couple, ceremony } = weddingConfig;

  return (
    <section className="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      backgroundImage: 'url(/hero-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'right -3rem center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}>
      {/* Overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255, 254, 247, 0.39) 0%, rgba(253, 248, 240, 0.4) 100%)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 0,
      }} />
      {/* Decorative corner elements */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        width: 'clamp(40px, 8vw, 80px)',
        height: 'clamp(40px, 8vw, 80px)',
        borderTop: '3px solid var(--color-antique-gold)',
        borderLeft: '3px solid var(--color-antique-gold)',
        opacity: 0.8,
        zIndex: 1,
        boxShadow: 'var(--shadow-md)',
      }} />
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        width: 'clamp(40px, 8vw, 80px)',
        height: 'clamp(40px, 8vw, 80px)',
        borderTop: '3px solid var(--color-antique-gold)',
        borderRight: '3px solid var(--color-antique-gold)',
        opacity: 0.8,
        zIndex: 1,
        boxShadow: 'var(--shadow-md)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '1rem',
        width: 'clamp(40px, 8vw, 80px)',
        height: 'clamp(40px, 8vw, 80px)',
        borderBottom: '3px solid var(--color-antique-gold)',
        borderLeft: '3px solid var(--color-antique-gold)',
        opacity: 0.8,
        zIndex: 1,
        boxShadow: 'var(--shadow-md)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        width: 'clamp(40px, 8vw, 80px)',
        height: 'clamp(40px, 8vw, 80px)',
        borderBottom: '3px solid var(--color-antique-gold)',
        borderRight: '3px solid var(--color-antique-gold)',
        opacity: 0.8,
        zIndex: 1,
        boxShadow: 'var(--shadow-md)',
      }} />

      <div className="container" style={{
        textAlign: 'center',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Small decorative heading */}
        <p className="fade-in" style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--color-sage)',
          marginBottom: '1.5rem',
        }}>
          Together with our families
        </p>

        {/* Main couple names */}
        <h1 className="fade-in fade-in-delay-1" style={{
          marginBottom: '1rem',
          color: 'var(--color-dark-brown)',
        }}>
          {couple.groom.title} {couple.groom.name}
        </h1>

        <p className="fade-in fade-in-delay-2" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          color: 'var(--color-antique-gold)',
          margin: '1rem 0',
          fontStyle: 'italic',
        }}>
          &amp;
        </p>

        <h1 className="fade-in fade-in-delay-2" style={{
          marginBottom: '2rem',
          color: 'var(--color-dark-brown)',
        }}>
          {couple.bride.title} {couple.bride.name}
        </h1>

        {/* Wedding date */}
        <div className="fade-in fade-in-delay-3" style={{
          marginBottom: '2rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-forest-green)',
            fontWeight: 600,
          }}>
            {ceremony.date}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="fade-in fade-in-delay-3" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          margin: '2rem 0',
        }}>
          <div style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
          <div style={{
            width: '8px',
            height: '8px',
            border: '1px solid var(--color-antique-gold)',
            transform: 'rotate(45deg)',
          }} />
          <div style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
        </div>

        {/* Short invitation message */}
        <p className="fade-in fade-in-delay-3" style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          maxWidth: '500px',
          margin: '0 auto 2rem auto',
        }}>
          Request the pleasure of your company
        </p>

        {/* Open Invitation Button */}
        <button
          onClick={onOpenInvitation}
          className="fade-in fade-in-delay-3"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: 'clamp(0.875rem, 2vw, 1rem) clamp(2rem, 5vw, 2.5rem)',
            background: 'linear-gradient(135deg, var(--color-antique-gold) 0%, var(--color-gold-light) 100%)',
            color: 'var(--color-dark-brown)',
            border: '2px solid var(--color-antique-gold)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: 'var(--shadow-lg)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
};

export default WeddingHero;
