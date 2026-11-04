import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit3, ArrowLeft, Upload, RefreshCw, Sparkles, AlertTriangle } from 'lucide-react';
import type { GalleryImage } from './Gallery';

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

export default function Admin() {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    const stored = localStorage.getItem('wedding_gallery_images');
    if (stored) {
      setImages(JSON.parse(stored));
    } else {
      setImages(defaultImages);
      localStorage.setItem('wedding_gallery_images', JSON.stringify(defaultImages));
    }
  };

  const showMsg = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  };

  // Canvas Image Compression Helper
  const compressImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const max_width = 1000; // Optimize for web display
          const scale = max_width / img.width;
          
          if (img.width > max_width) {
            canvas.width = max_width;
            canvas.height = img.height * scale;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas context error');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Compress quality to 0.7 JPEG to fit localStorage limits easily
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        img.onerror = () => reject('Image load error');
      };
      reader.onerror = () => reject('File read error');
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleSelectForEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsEditing(true);
    setTitle(image.title);
    setCaption(image.caption);
    setImageUrl(image.url.startsWith('data:') ? '' : image.url);
    setUploadType(image.url.startsWith('data:') ? 'file' : 'url');
    setFileInput(null);
  };

  const handleOpenAddForm = () => {
    setSelectedImage(null);
    setIsEditing(false);
    setTitle('');
    setCaption('');
    setImageUrl('');
    setFileInput(null);
    setUploadType('url');
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    // Filter out the image
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
    localStorage.setItem('wedding_gallery_images', JSON.stringify(updated));
    showMsg("Image deleted successfully!", "success");
    
    if (selectedImage?.id === id) {
      handleOpenAddForm();
    }
  };

  const handleResetToDefault = () => {
    if (!window.confirm("Are you sure you want to reset all images to the default templates? This will delete all custom uploads.")) return;
    setImages(defaultImages);
    localStorage.setItem('wedding_gallery_images', JSON.stringify(defaultImages));
    showMsg("Reset to default images successfully!", "success");
    handleOpenAddForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalUrl = imageUrl;

      // Handle file upload compression
      if (uploadType === 'file') {
        if (fileInput) {
          finalUrl = await compressImageFile(fileInput);
        } else if (selectedImage && selectedImage.url.startsWith('data:')) {
          finalUrl = selectedImage.url; // Keep old compressed file
        } else {
          showMsg("Please select an image file to upload.", "error");
          setLoading(false);
          return;
        }
      } else {
        if (!finalUrl.trim()) {
          showMsg("Please enter a valid image URL.", "error");
          setLoading(false);
          return;
        }
      }

      if (isEditing && selectedImage) {
        // Edit flow
        const updated = images.map(img => {
          if (img.id === selectedImage.id) {
            return {
              ...img,
              title: title.trim(),
              caption: caption.trim(),
              url: finalUrl
            };
          }
          return img;
        });
        setImages(updated);
        localStorage.setItem('wedding_gallery_images', JSON.stringify(updated));
        showMsg("Image details updated successfully!", "success");
        // Update selected image state
        setSelectedImage({ id: selectedImage.id, title, caption, url: finalUrl });
      } else {
        // Add flow
        const newImg: GalleryImage = {
          id: Date.now().toString(),
          title: title.trim() || 'New Picture',
          caption: caption.trim() || 'Gallery Moment',
          url: finalUrl
        };
        const updated = [...images, newImg];
        setImages(updated);
        localStorage.setItem('wedding_gallery_images', JSON.stringify(updated));
        showMsg("New image added successfully!", "success");
        handleOpenAddForm();
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to process image file. Ensure it is a valid picture.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Admin Navbar */}
      <nav className="admin-navbar">
        <div className="admin-nav-content">
          <button onClick={() => navigate('/')} className="back-website-btn">
            <ArrowLeft size={16} />
            <span>Back to Website</span>
          </button>
          
          <div className="admin-nav-title-wrap">
            <Sparkles className="spark-gold" size={18} />
            <h1 className="font-title admin-nav-title">Gallery Editor Panel</h1>
          </div>
          
          <button onClick={handleResetToDefault} className="reset-btn-gold" title="Restore default templates">
            <RefreshCw size={14} />
            <span>Reset Templates</span>
          </button>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="admin-content-grid">
        {/* Left Panel: Form editor */}
        <div className="admin-card-wrap form-col-wrap">
          <div className="image-frame admin-editor-card">
            <h2 className="editor-card-title font-title">
              {isEditing ? `Edit Image Details` : 'Add New Image to Gallery'}
            </h2>
            <div className="ornamental-divider">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2L2 12l10 10 10-10L12 2z" />
              </svg>
            </div>

            {message && (
              <div className={`status-banner banner-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label className="form-label">Title / Heading</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  placeholder="e.g. Traditional Walk"
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Caption / Description</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={caption} 
                  onChange={e => setCaption(e.target.value)} 
                  placeholder="e.g. Hand in hand walking into new beginnings" 
                  required
                />
              </div>

              {/* Source Switcher */}
              <div className="form-group">
                <label className="form-label">Image Source Type</label>
                <div className="source-toggle-group">
                  <button 
                    type="button" 
                    className={`toggle-btn-left ${uploadType === 'url' ? 'active' : ''}`}
                    onClick={() => setUploadType('url')}
                  >
                    Image URL Link
                  </button>
                  <button 
                    type="button" 
                    className={`toggle-btn-right ${uploadType === 'file' ? 'active' : ''}`}
                    onClick={() => setUploadType('file')}
                  >
                    Upload Local File
                  </button>
                </div>
              </div>

              {uploadType === 'url' ? (
                <div className="form-group">
                  <label className="form-label">Web Image URL</label>
                  <input 
                    type="url" 
                    className="form-input" 
                    value={imageUrl} 
                    onChange={e => setImageUrl(e.target.value)} 
                    placeholder="https://example.com/wedding-photo.jpg"
                    required={uploadType === 'url'}
                  />
                  <span className="input-hint">Paste any online JPEG/PNG image link</span>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Select Photo File</label>
                  <div className="file-uploader-box">
                    <input 
                      type="file" 
                      id="photo-file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden-file-input"
                    />
                    <label htmlFor="photo-file" className="file-upload-trigger">
                      <Upload size={22} className="upload-cloud-icon" />
                      <span className="file-name-label">
                        {fileInput ? fileInput.name : 'Choose an image file...'}
                      </span>
                    </label>
                  </div>
                  <span className="input-hint hint-warn">
                    <AlertTriangle size={10} /> Local files are compressed and saved directly in your browser.
                  </span>
                </div>
              )}

              <div className="form-submit-row">
                <button type="submit" disabled={loading} className="btn-gold admin-submit-btn">
                  {loading ? 'Processing Image...' : (isEditing ? 'Save Changes' : 'Add Image')}
                </button>
                
                {isEditing && (
                  <button type="button" onClick={handleOpenAddForm} className="cancel-edit-btn">
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel: Current photos list */}
        <div className="admin-card-wrap list-col-wrap">
          <div className="image-frame admin-list-card">
            <h2 className="editor-card-title font-title">Current Gallery ({images.length})</h2>
            <p className="panel-desc">All images in the gallery are displayed below. Unused images are automatically deleted from storage.</p>
            
            <div className="admin-gallery-scroller">
              {images.length > 0 ? (
                <div className="admin-gallery-list">
                  {images.map((image) => (
                    <div 
                      key={image.id} 
                      className={`admin-image-row ${selectedImage?.id === image.id ? 'row-selected' : ''}`}
                    >
                      <div className="row-image-preview">
                        <img src={image.url} alt={image.title} />
                      </div>
                      <div className="row-text-content">
                        <h4 className="row-title font-title">{image.title}</h4>
                        <p className="row-desc">{image.caption}</p>
                      </div>
                      <div className="row-actions">
                        <button 
                          onClick={() => handleSelectForEdit(image)}
                          className="action-icon-btn edit-action"
                          title="Edit Details"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(image.id)}
                          className="action-icon-btn delete-action"
                          title="Delete Image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-gallery-msg font-serif">
                  The gallery is empty. Use the form to add images.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-page-container {
          background-color: var(--color-bg-secondary);
          min-height: 100vh;
          width: 100vw;
          padding: 8rem 2rem 4rem;
          color: var(--color-text-dark);
        }

        .admin-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 5.5rem;
          background-color: white;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          z-index: 1000;
          display: flex;
          align-items: center;
        }

        .admin-nav-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-website-btn {
          background: transparent;
          border: var(--border-gold-heavy);
          color: var(--color-accent-maroon);
          padding: 0.6rem 1.25rem;
          border-radius: 4px;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-smooth);
        }

        .back-website-btn:hover {
          background-color: var(--color-bg-secondary);
          transform: translateX(-3px);
        }

        .admin-nav-title-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .spark-gold {
          color: var(--color-accent-gold);
          animation: pulse-slow 3s infinite ease-in-out;
        }

        .admin-nav-title {
          font-size: 1.8rem;
          color: var(--color-accent-maroon);
        }

        .reset-btn-gold {
          background: transparent;
          border: 1px dashed var(--color-accent-gold);
          color: var(--color-accent-gold-dark);
          padding: 0.6rem 1.25rem;
          border-radius: 4px;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition-fast);
        }

        .reset-btn-gold:hover {
          background-color: rgba(197, 160, 89, 0.08);
          border-style: solid;
          color: var(--color-accent-maroon);
        }

        .admin-content-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .admin-content-grid {
            grid-template-columns: 1fr;
          }
        }

        .admin-editor-card, .admin-list-card {
          background: white;
          padding: 2.5rem;
          border-radius: 4px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .editor-card-title {
          font-size: 1.6rem;
          color: var(--color-accent-maroon);
        }

        .panel-desc {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
          font-weight: 300;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .status-banner {
          padding: 0.9rem 1.25rem;
          border-radius: 4px;
          font-size: 0.8rem;
          margin-bottom: 1.5rem;
          animation: fade-in-up 0.3s ease;
          text-align: left;
        }

        .banner-success {
          background-color: rgba(10, 54, 37, 0.08);
          border: 1px solid rgba(10, 54, 37, 0.2);
          color: #0a3625;
        }

        .banner-error {
          background-color: rgba(99, 15, 32, 0.08);
          border: 1px solid rgba(99, 15, 32, 0.2);
          color: var(--color-accent-maroon);
        }

        /* Source Toggle */
        .source-toggle-group {
          display: flex;
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 4px;
          overflow: hidden;
        }

        .source-toggle-group button {
          flex: 1;
          padding: 0.8rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: none;
          background: var(--color-bg-primary);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .source-toggle-group button.active {
          background-color: var(--color-accent-maroon);
          color: white;
        }

        .toggle-btn-left {
          border-right: 1px solid rgba(197, 160, 89, 0.2) !important;
        }

        /* File Upload */
        .file-uploader-box {
          position: relative;
          width: 100%;
        }

        .hidden-file-input {
          display: none;
        }

        .file-upload-trigger {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border: 1px dashed rgba(197, 160, 89, 0.5);
          border-radius: 4px;
          background-color: var(--color-bg-primary);
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: center;
        }

        .file-upload-trigger:hover {
          background-color: rgba(197, 160, 89, 0.05);
          border-color: var(--color-accent-gold-dark);
        }

        .upload-cloud-icon {
          color: var(--color-accent-gold);
          margin-bottom: 0.5rem;
        }

        .file-name-label {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          word-break: break-all;
        }

        .input-hint {
          font-size: 0.65rem;
          color: var(--color-text-muted);
          margin-top: 0.35rem;
          font-style: italic;
        }

        .hint-warn {
          color: var(--color-accent-maroon);
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
        }

        .form-submit-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-top: 1rem;
        }

        .admin-submit-btn {
          flex: 1.5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 48px;
        }

        .cancel-edit-btn {
          flex: 1;
          background-color: transparent;
          border: 1px solid rgba(0,0,0,0.15);
          color: var(--color-text-muted);
          height: 48px;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .cancel-edit-btn:hover {
          background-color: var(--color-bg-primary);
          color: var(--color-text-dark);
        }

        /* Scroller Lists */
        .admin-gallery-scroller {
          max-height: 520px;
          overflow-y: auto;
          padding-right: 0.5rem;
          scrollbar-width: thin;
        }

        .admin-gallery-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .admin-image-row {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border: var(--border-gold);
          background-color: var(--color-bg-primary);
          border-radius: 4px;
          align-items: center;
          transition: var(--transition-fast);
        }

        .admin-image-row:hover {
          border-color: var(--color-accent-gold);
          box-shadow: 0 4px 15px rgba(197, 160, 89, 0.08);
        }

        .row-selected {
          border-color: var(--color-accent-maroon) !important;
          background-color: rgba(99, 15, 32, 0.02);
          box-shadow: 0 4px 15px rgba(99, 15, 32, 0.05);
        }

        .row-image-preview {
          width: 60px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(197, 160, 89, 0.2);
        }

        .row-image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .row-text-content {
          flex: 1;
          text-align: left;
          min-width: 0;
        }

        .row-title {
          font-size: 1.1rem;
          color: var(--color-accent-maroon);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .row-desc {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 300;
        }

        .row-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
          background: white;
        }

        .edit-action {
          border: 1px solid rgba(197, 160, 89, 0.4);
          color: var(--color-accent-gold-dark);
        }

        .edit-action:hover {
          background-color: var(--color-accent-gold);
          color: white;
          border-color: var(--color-accent-gold);
        }

        .delete-action {
          border: 1px solid rgba(99, 15, 32, 0.2);
          color: var(--color-accent-maroon);
        }

        .delete-action:hover {
          background-color: var(--color-accent-maroon);
          color: white;
          border-color: var(--color-accent-maroon);
        }

        .empty-gallery-msg {
          padding: 4rem 1rem;
          color: var(--color-text-muted);
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
