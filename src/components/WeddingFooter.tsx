import React from 'react';
import { weddingConfig } from '../weddingConfig';

const WeddingFooter: React.FC = () => {
  const { closingMessage, couple } = weddingConfig;

  return (
    <footer style={{
      padding: '4rem 1rem',
      backgroundImage: 'url(/footer-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      textAlign: 'center',
      color: 'var(--color-ivory)',
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(45, 74, 62, 0.9) 0%, rgba(31, 51, 41, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 0,
      }} />
      <div className="container" style={{
        maxWidth: '700px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Decorative element */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            border: '1px solid var(--color-antique-gold)',
            transform: 'rotate(45deg)',
          }} />
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
        </div>

        {/* Closing Message */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          lineHeight: '1.8',
          color: 'var(--color-ivory)',
          fontStyle: 'italic',
          marginBottom: '2rem',
        }}>
          {closingMessage}
        </p>

        {/* Couple Names */}
        <div style={{
          marginBottom: '2rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: 'var(--color-antique-gold)',
            marginBottom: '0.5rem',
          }}>
            {couple.groom.name}
          </h3>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            color: 'var(--color-ivory)',
            fontStyle: 'italic',
          }}>
            &amp;
          </p>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: 'var(--color-antique-gold)',
            marginTop: '0.5rem',
          }}>
            {couple.bride.name}
          </h3>
        </div>

        {/* Decorative element */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
          <div style={{
            width: '6px',
            height: '6px',
            border: '1px solid var(--color-antique-gold)',
            transform: 'rotate(45deg)',
          }} />
          <div style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--color-antique-gold)',
          }} />
        </div>

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          color: 'rgba(255, 254, 247, 0.7)',
          letterSpacing: '0.05em',
        }}>
          © 2027 Anudas & Sikhila
        </p>
      </div>
    </footer>
  );
};

export default WeddingFooter;
