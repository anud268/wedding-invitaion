import React from 'react';
import { MapPin } from 'lucide-react';
import { WeddingEvent } from '../weddingConfig';

interface WeddingEventProps {
  event: WeddingEvent;
  showTempleIcon?: boolean;
}

const WeddingEventCard: React.FC<WeddingEventProps> = ({ event, showTempleIcon = false }) => {
  return (
    <div style={{
      background: 'rgba(255, 254, 247, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '2px solid var(--color-antique-gold)',
      borderRadius: '16px',
      padding: '2.5rem',
      textAlign: 'center',
      transition: 'var(--transition-smooth)',
      boxShadow: 'var(--shadow-lg)',
    }}>
      {/* Event Title */}
      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
        color: 'var(--color-forest-green)',
        marginBottom: '1.5rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}>
        {event.title}
      </h3>

      {/* Decorative divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          width: '30px',
          height: '1px',
          backgroundColor: 'var(--color-antique-gold)',
        }} />
        {showTempleIcon && (
          <div style={{
            fontSize: '1.5rem',
            color: 'var(--color-antique-gold)',
          }}>
            🛕
          </div>
        )}
        <div style={{
          width: '30px',
          height: '1px',
          backgroundColor: 'var(--color-antique-gold)',
        }} />
      </div>

      {/* Date and Day */}
      <div style={{
        marginBottom: '1.5rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1.1rem',
          fontWeight: 600,
          color: 'var(--color-dark-brown)',
          marginBottom: '0.25rem',
        }}>
          {event.date}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'var(--color-sage)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {event.day}
        </p>
      </div>

      {/* Venue */}
      <div style={{
        marginBottom: '1rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          color: 'var(--color-dark-brown)',
          fontWeight: 500,
        }}>
          {event.venue}
        </p>
      </div>

      {/* Location */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem',
      }}>
        <MapPin size={16} style={{ color: 'var(--color-antique-gold)' }} />
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          color: 'var(--color-text-muted)',
        }}>
          {event.location}
        </p>
      </div>

      {/* Get Directions Button */}
      <a
        href={event.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.875rem 2rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.95rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: 'var(--color-dark-brown)',
          background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-ivory) 100%)',
          border: '2px solid var(--color-antique-gold)',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <MapPin size={16} />
        Get Directions
      </a>
    </div>
  );
};

export default WeddingEventCard;
