import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  caption: string;
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    url: '/assets/gallery1.png',
    title: 'The Eternal Smile',
    caption: 'Moments of laughter and shared promises.'
  },
  {
    id: '2',
    url: '/assets/gallery2.png',
    title: 'Serenade of Gold',
    caption: 'Tradition meets love in the sunset glow.'
  },
  {
    id: '3',
    url: '/assets/gallery3.png',
    title: 'Hand in Hand',
    caption: 'The beginning of a beautiful journey together.'
  },
  {
    id: '4',
    url: '/assets/gallery4.png',
    title: 'A Shy Glance',
    caption: 'Eyes that speak a thousand unspoken words.'
  },
  {
    id: '5',
    url: '/assets/gallery5.png',
    title: 'The Sacred Circle',
    caption: 'Sacred rings symbolising an unbroken bond.'
  },
  {
    id: '6',
    url: '/assets/gallery6.png',
    title: 'Canopy of Joy',
    caption: 'Laughter echoing under traditional canopies.'
  }
];

export default function Gallery() {
  const [images] = useState<GalleryImage[]>(() => {
    const storedImages = localStorage.getItem('wedding_gallery_images');
    if (storedImages) {
      return JSON.parse(storedImages);
    }
    localStorage.setItem('wedding_gallery_images', JSON.stringify(defaultImages));
    return defaultImages;
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {

    // Reveal animation
    const reveals = document.querySelectorAll('.gallery-reveal');
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

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = ''; // Unlock background scroll
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && images.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null || images.length === 0) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setLightboxIndex((lightboxIndex + 1) % images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images]);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-container">
        <div className="text-center gallery-header-wrap">
          <span className="font-subtitle">Captured Memories</span>
          <h2 className="font-title gallery-main-title">Our Gallery</h2>
          <div className="ornamental-divider">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 12l10 10 10-10L12 2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <p className="gallery-intro font-serif">
            "A collection of moments captured in time, reflecting the simple joy of our together."
          </p>
        </div>

        {/* Masonry Grid */}
        {images.length > 0 ? (
          <div className="masonry-grid gallery-reveal reveal-scale">
            {images.map((image, idx) => (
              <div 
                key={image.id || idx} 
                className="masonry-item"
                onClick={() => openLightbox(idx)}
              >
                <div className="masonry-img-wrapper image-frame">
                  <img 
                    src={image.url} 
                    alt={image.title} 
                    className="masonry-img" 
                    loading="lazy"
                  />
                  <div className="masonry-overlay">
                    <div className="gallery-hover-content">
                      <ZoomIn className="zoom-icon" size={24} />
                      <h3 className="hover-title font-title">{image.title}</h3>
                      <p className="hover-caption">{image.caption}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 font-serif text-muted">
            No images in the gallery yet. Go to <a href="/adminuploadphoto">Admin Panel</a> to add images.
          </div>
        )}
      </div>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && images.length > 0 && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close-btn" onClick={closeLightbox}>
            <X size={30} />
          </button>
          
          <button className="lightbox-nav-btn nav-left" onClick={prevImage}>
            <ChevronLeft size={40} />
          </button>
          
          <div className="lightbox-content-wrap" onClick={e => e.stopPropagation()}>
            <img 
              src={images[lightboxIndex].url} 
              alt={images[lightboxIndex].title} 
              className="lightbox-main-img"
            />
            <div className="lightbox-details-panel">
              <h3 className="lightbox-title font-title">{images[lightboxIndex].title}</h3>
              <p className="lightbox-desc">{images[lightboxIndex].caption}</p>
              <span className="lightbox-counter">
                {lightboxIndex + 1} / {images.length}
              </span>
            </div>
          </div>
          
          <button className="lightbox-nav-btn nav-right" onClick={nextImage}>
            <ChevronRight size={40} />
          </button>
        </div>
      )}

      <style>{`
        .gallery-section {
          background-color: var(--color-bg-secondary);
          position: relative;
        }

        .gallery-header-wrap {
          margin-bottom: 4rem;
        }

        .gallery-main-title {
          font-size: 3.5rem;
          margin-top: 0.5rem;
        }

        .gallery-intro {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 1.5rem auto 0;
          line-height: 1.6;
          font-style: italic;
        }

        .gallery-hover-content {
          width: 100%;
          transform: translateY(15px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .masonry-img-wrapper:hover .gallery-hover-content {
          transform: translateY(0);
        }

        .zoom-icon {
          color: var(--color-accent-gold-light);
          margin-bottom: 0.75rem;
        }

        .hover-title {
          color: var(--color-bg-primary) !important;
          font-size: 1.5rem;
          margin-bottom: 0.25rem;
        }

        .hover-caption {
          font-size: 0.75rem;
          color: rgba(252, 250, 246, 0.75);
          font-weight: 300;
          letter-spacing: 0.05em;
        }

        /* Lightbox CSS */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(18, 18, 18, 0.95);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(15px);
          animation: fade-in-fast 0.3s ease;
        }

        @keyframes fade-in-fast {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lightbox-close-btn {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: none;
          border: none;
          color: var(--color-bg-primary);
          cursor: pointer;
          transition: color 0.3s ease;
          z-index: 10002;
        }

        .lightbox-close-btn:hover {
          color: var(--color-accent-gold);
        }

        .lightbox-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--color-bg-primary);
          cursor: pointer;
          transition: color 0.3s ease, transform 0.3s ease;
          padding: 1rem;
          z-index: 10002;
        }

        .lightbox-nav-btn:hover {
          color: var(--color-accent-gold);
        }

        .nav-left {
          left: 2rem;
        }
        .nav-left:hover {
          transform: translateY(-50%) translateX(-5px);
        }

        .nav-right {
          right: 2rem;
        }
        .nav-right:hover {
          transform: translateY(-50%) translateX(5px);
        }

        .lightbox-content-wrap {
          max-width: 800px;
          width: 90%;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: scale-up-fast 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes scale-up-fast {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .lightbox-main-img {
          max-height: 70vh;
          max-width: 100%;
          object-fit: contain;
          border: 1px solid rgba(252, 250, 246, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          border-radius: 4px;
        }

        .lightbox-details-panel {
          width: 100%;
          background-color: rgba(30, 30, 30, 0.8);
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-top: none;
          padding: 1.5rem;
          color: var(--color-text-light);
          position: relative;
          text-align: center;
          border-radius: 0 0 4px 4px;
          backdrop-filter: blur(10px);
        }

        .lightbox-title {
          color: var(--color-accent-gold-light) !important;
          font-size: 1.6rem;
          margin-bottom: 0.25rem;
        }

        .lightbox-desc {
          font-size: 0.85rem;
          color: rgba(252, 250, 246, 0.7);
          font-weight: 300;
          margin-bottom: 0.5rem;
        }

        .lightbox-counter {
          font-size: 0.7rem;
          color: var(--color-accent-gold);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .gallery-main-title {
            font-size: 2.5rem;
          }
          .lightbox-nav-btn {
            padding: 0.5rem;
          }
          .nav-left { left: 0.5rem; }
          .nav-right { right: 0.5rem; }
          .lightbox-close-btn {
            top: 1rem;
            right: 1rem;
          }
          .lightbox-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
}
