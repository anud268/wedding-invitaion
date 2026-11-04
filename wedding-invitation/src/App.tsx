import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Story from './components/Story';
import Gallery from './components/Gallery';
import Parents from './components/Parents';
import Hobbies from './components/Hobbies';
import Address from './components/Address';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Admin from './components/Admin';
import { Menu, X } from 'lucide-react';

// Main wedding website layout containing all details
function MainInvitation() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Reveal animations using IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // Handle scroll background for Nav Header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="scroll-container">
      {/* Floating Header */}
      <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#home" className="nav-logo font-title">A & S</a>
          
          <button className="mobile-nav-toggle" onClick={toggleNav} aria-label="Toggle navigation menu">
            {isNavOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className={`nav-menu ${isNavOpen ? 'nav-menu-open' : ''}`}>
            <a href="#home" onClick={() => setIsNavOpen(false)} className="nav-link">Home</a>
            <a href="#story" onClick={() => setIsNavOpen(false)} className="nav-link">Our Story</a>
            <a href="#gallery" onClick={() => setIsNavOpen(false)} className="nav-link">Gallery</a>
            <a href="#parents" onClick={() => setIsNavOpen(false)} className="nav-link">Parents</a>
            <a href="#hobbies" onClick={() => setIsNavOpen(false)} className="nav-link">Hobbies</a>
            <a href="#address" onClick={() => setIsNavOpen(false)} className="nav-link">Venues</a>
            <a href="#rsvp" onClick={() => setIsNavOpen(false)} className="nav-link">RSVP</a>
            <a href="/adminuploadphoto" className="nav-link nav-edit-link">Edit Images</a>
          </nav>
        </div>
      </header>

      {/* Main Sections */}
      <main>
        <Hero />
        <Story />
        <Gallery />
        <Parents />
        <Hobbies />
        <Address />
        <RSVP />
      </main>

      <Footer />

      {/* Floating Music player */}
      <MusicPlayer />

      <style>{`
        /* Header Navigation */
        .nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 5.5rem;
          display: flex;
          align-items: center;
          z-index: 1000;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }

        .nav-scrolled {
          background-color: rgba(252, 250, 246, 0.95);
          backdrop-filter: blur(10px);
          height: 4.5rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }

        .nav-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          font-size: 1.8rem;
          text-decoration: none;
          color: var(--color-accent-maroon);
          transition: var(--transition-fast);
        }

        .nav-logo:hover {
          color: var(--color-accent-gold);
        }

        .nav-menu {
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-link {
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--color-text-dark);
          transition: var(--transition-fast);
          position: relative;
          padding: 0.5rem 0;
        }

        /* Nav link line hover */
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--color-accent-gold);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: var(--color-accent-maroon);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .nav-edit-link {
          border: 1px dashed var(--color-accent-gold);
          padding: 0.4rem 1rem !important;
          border-radius: 4px;
          color: var(--color-accent-gold-dark) !important;
        }

        .nav-edit-link::after {
          display: none;
        }

        .nav-edit-link:hover {
          background-color: var(--color-accent-maroon);
          color: white !important;
          border-color: var(--color-accent-maroon);
        }

        .nav-header:not(.nav-scrolled) .nav-link {
          color: rgba(252, 250, 246, 0.8);
        }

        .nav-header:not(.nav-scrolled) .nav-link:hover {
          color: var(--color-accent-gold-light);
        }

        .nav-header:not(.nav-scrolled) .nav-logo {
          color: var(--color-bg-primary);
        }

        .nav-header:not(.nav-scrolled) .nav-edit-link {
          border-color: rgba(252, 250, 246, 0.5);
          color: rgba(252, 250, 246, 0.9) !important;
        }

        .nav-header:not(.nav-scrolled) .nav-edit-link:hover {
          background-color: var(--color-accent-gold);
          color: var(--color-text-dark) !important;
          border-color: var(--color-accent-gold);
        }

        /* Mobile Nav Toggle */
        .mobile-nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-text-dark);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .nav-header:not(.nav-scrolled) .mobile-nav-toggle {
          color: var(--color-bg-primary);
        }

        @media (max-width: 768px) {
          .mobile-nav-toggle {
            display: block;
          }

          .nav-menu {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 70%;
            max-width: 300px;
            background-color: var(--color-bg-primary);
            border-left: 1px solid rgba(197, 160, 89, 0.2);
            box-shadow: -10px 0 40px rgba(0, 0, 0, 0.05);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2.5rem;
            transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 999;
          }

          .nav-menu-open {
            right: 0;
          }

          .nav-link {
            font-size: 0.85rem;
            color: var(--color-text-dark) !important;
          }
        }
      `}</style>
    </div>
  );
}

// Router Setup
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainInvitation />} />
        <Route path="/adminuploadphoto" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
