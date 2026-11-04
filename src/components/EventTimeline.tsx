import React from 'react';
import WeddingEventCard from './WeddingEvent';
import { weddingConfig } from '../weddingConfig';

const EventTimeline: React.FC = () => {
  const { ceremony, reception } = weddingConfig;

  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundImage: 'url(/timeline-bg.jpg)',
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
        background: 'linear-gradient(135deg, rgba(255, 254, 247, 0.9) 0%, rgba(253, 248, 240, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 0,
      }} />
      <div className="container" style={{
        maxWidth: '1000px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            color: 'var(--color-dark-brown)',
            marginBottom: '1rem',
            letterSpacing: '0.02em',
          }}>
            Celebration Events
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}>
            <div style={{
              width: '50px',
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
              width: '50px',
              height: '1px',
              backgroundColor: 'var(--color-antique-gold)',
            }} />
          </div>
        </div>

        {/* Events Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
        }}>
          {/* Wedding Ceremony */}
          <div>
            <WeddingEventCard event={ceremony} showTempleIcon={true} />
          </div>

          {/* Wedding Reception */}
          <div>
            <WeddingEventCard event={reception} showTempleIcon={false} />
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 768px) {
          #event-timeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default EventTimeline;
