import { useEffect, useState } from "react";
import api from "../services/api";
import "./Gallery.css"; 

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/gallery");
        setImages(res.data);
      } catch (err) {
        console.error("Failed to load gallery", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-page-wrapper">
      <div className="container py-5">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-5">
          <h1 className="devotional-header">Divine Gallery</h1>
          <div className="header-divider">
            <span className="om-symbol">ॐ</span>
          </div>
          <p className="devotional-subtitle">
            Glimpses of divine moments, celebrations, and the sacred beauty of the temple.
          </p>
        </div>

        {/* --- LOADING STATE --- */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
            <p className="mt-3 text-muted">Loading sacred images...</p>
          </div>
        )}

        {/* --- EMPTY STATE --- */}
        {!loading && images.length === 0 && (
          <div className="text-center py-5">
            <p className="text-muted">No images uploaded to the gallery yet.</p>
          </div>
        )}

        {/* --- MASONRY GRID (Pinterest Style) --- */}
        {!loading && images.length > 0 && (
          <div className="gallery-masonry">
            {images.map((img) => (
              <div 
                className="gallery-item" 
                key={img.id} 
                onClick={() => setSelectedImage(img)}
              >
                <div className="image-frame">
                  <img
                    src={img.imageUrl}
                    alt="Temple Event"
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="overlay">
                    <span className="view-text">View Full Size</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- MODAL (POPUP) FOR FULL VIEW --- */}
        {selectedImage && (
          <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
            <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
              <img src={selectedImage.imageUrl} alt="Full View" className="full-size-img" />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}