import React from 'react';
import { weddingConfig } from '../weddingConfig';

const CoupleSection: React.FC = () => {
  const { couple } = weddingConfig;

  return (
    <section style={{
      padding: '4rem 1rem',
      background: 'var(--color-ivory)',
      textAlign: 'center',
    }}>
      <div className="container" style={{
        maxWidth: '900px',
      }}>
        {/* Decorative top element */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
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

        {/* Groom */}
        <div style={{
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            color: 'var(--color-dark-brown)',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            {couple.groom.title} {couple.groom.name}
          </h2>
        </div>

        {/* Ampersand */}
        <div style={{
          margin: '1.5rem 0',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: 'var(--color-antique-gold)',
            fontStyle: 'italic',
          }}>
            &amp;
          </p>
        </div>

        {/* Bride */}
        <div style={{
          marginTop: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            color: 'var(--color-dark-brown)',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            {couple.bride.title} {couple.bride.name}
          </h2>
        </div>

        {/* Decorative bottom element */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '3rem',
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
      </div>
    </section>
  );
};

export default CoupleSection;
