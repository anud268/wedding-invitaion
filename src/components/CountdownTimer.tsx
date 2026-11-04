import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../weddingConfig';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Target date: 10 February 2027 at 9:00 AM IST
    // This is configurable in weddingConfig.ts
    const targetDate = new Date(`${weddingConfig.countdownTarget.date}T${weddingConfig.countdownTarget.time}:00+05:30`);

    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsComplete(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '90px',
      padding: '1.5rem 1rem',
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '12px',
      border: '1px solid rgba(201, 169, 98, 0.3)',
      boxShadow: 'var(--shadow-md)',
      transition: 'var(--transition-smooth)',
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
        fontWeight: 600,
        color: 'var(--color-forest-green)',
        marginBottom: '0.5rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}>
        {String(value).padStart(2, '0')}
      </div>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-antique-gold)',
        fontWeight: 600,
      }}>
        {label}
      </div>
    </div>
  );

  if (isComplete) {
    return (
      <section style={{
        padding: '4rem 1rem',
        background: 'var(--color-cream)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            color: 'var(--color-forest-green)',
            marginBottom: '1rem',
          }}>
            Our Special Day Has Arrived!
          </h3>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
          }}>
            With love and blessings, we celebrate our union.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundImage: 'url(/countdown-bg.jpg)',
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
        background: 'linear-gradient(135deg, rgba(253, 248, 240, 0.9) 0%, rgba(255, 254, 247, 0.85) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 0,
      }} />
      <div className="container" style={{
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          color: 'var(--color-dark-brown)',
          marginBottom: '0.5rem',
          letterSpacing: '0.05em',
        }}>
          Counting Down To Our Special Day
        </h3>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'var(--color-sage)',
          marginBottom: '2rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {weddingConfig.ceremony.date}
        </p>

        {/* Countdown Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <TimeUnit value={timeRemaining.days} label="Days" />
          <TimeUnit value={timeRemaining.hours} label="Hours" />
          <TimeUnit value={timeRemaining.minutes} label="Minutes" />
          <TimeUnit value={timeRemaining.seconds} label="Seconds" />
        </div>

        {/* Note about configurable time */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
          marginTop: '2rem',
          fontStyle: 'italic',
        }}>
          * Countdown based on Indian Standard Time (IST)
        </p>
      </div>
    </section>
  );
};

export default CountdownTimer;
