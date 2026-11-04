import React from 'react';
import { weddingConfig } from '../weddingConfig';

const InvitationMessage: React.FC = () => {
  const { invitationMessage } = weddingConfig;

  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundImage: 'url(/invitation-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(253, 248, 240, 0.92) 0%, rgba(255, 254, 247, 0.88) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 0,
      }} />
      <div className="container" style={{
        maxWidth: '700px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Decorative border */}
        <div style={{
          border: '2px solid var(--color-antique-gold)',
          padding: '3rem 2rem',
          borderRadius: '8px',
          background: 'rgba(255, 254, 247, 0.95)',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          boxShadow: 'var(--shadow-lg)',
        }}>
          {/* Decorative corner ornaments */}
          <div style={{
            position: 'relative',
          }}>
            {/* Top left */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '-8px',
              width: '16px',
              height: '16px',
              borderTop: '2px solid var(--color-antique-gold)',
              borderLeft: '2px solid var(--color-antique-gold)',
            }} />

            {/* Top right */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '16px',
              height: '16px',
              borderTop: '2px solid var(--color-antique-gold)',
              borderRight: '2px solid var(--color-antique-gold)',
            }} />

            {/* Bottom left */}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              left: '-8px',
              width: '16px',
              height: '16px',
              borderBottom: '2px solid var(--color-antique-gold)',
              borderLeft: '2px solid var(--color-antique-gold)',
            }} />

            {/* Bottom right */}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              width: '16px',
              height: '16px',
              borderBottom: '2px solid var(--color-antique-gold)',
              borderRight: '2px solid var(--color-antique-gold)',
            }} />

            {/* Message content */}
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              lineHeight: '1.8',
              color: 'var(--color-dark-brown)',
              fontStyle: 'italic',
            }}>
              {invitationMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvitationMessage;
