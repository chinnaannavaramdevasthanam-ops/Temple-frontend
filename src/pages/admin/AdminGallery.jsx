import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminGallery.css"; 

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data);
    } catch (err) {
      console.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async () => {
    if (!file) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      await api.post("/gallery", formData);
      setFile(null); 
      
      document.getElementById("fileInput").value = ""; 
      fetchImages(); 
      alert("✅ Image uploaded successfully");
    } catch {
      alert("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sacred image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      fetchImages();
    } catch {
      alert("Failed to delete image");
    }
  };

  return (
    <div className="admin-page-wrapper">
      
      {/* --- HEADER --- */}
      <div className="admin-header-row mb-4">
        <div>
          <h2 className="admin-page-title">Manage Gallery</h2>
          <p className="admin-subtitle">Upload and remove temple images</p>
        </div>
        <div className="image-count-badge">
          Total Images: {images.length}
        </div>
      </div>

      {/* --- UPLOAD SECTION --- */}
      <div className="upload-section-card mb-5">
        <h4 className="upload-title">Add New Sacred Image</h4>
        
        <div className="upload-controls">
          <input
            id="fileInput"
            type="file"
            className="file-input-custom"
            accept="image/*"
            onChange={e => setFile(e.target.files[0])}
          />
          
          <button
            className={`upload-btn ${uploading ? "disabled" : ""}`}
            onClick={uploadImage}
            disabled={uploading}
          >
            {uploading ? (
              <span><span className="spinner-border spinner-border-sm"></span> Uploading...</span>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>
        
        {file && <p className="file-selected-text">Selected: {file.name}</p>}
      </div>

      {/* --- GALLERY GRID --- */}
      {loading ? (
        <div className="admin-loading">
          <div className="spinner-border text-gold" role="status"></div>
          <p>Loading Gallery...</p>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {images.map(img => (
            <div className="admin-img-card" key={img.id}>
              <div className="img-wrapper">
                <img
                  src={img.imageUrl}
                  alt="Gallery Item"
                  className="admin-gallery-img"
                  loading="lazy"
                />
              </div>
              <div className="card-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteImage(img.id)}
                >
                  Delete Image
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div className="empty-state-admin">
          <p>No images in gallery. Upload one to get started.</p>
        </div>
      )}
    </div>
  );
}