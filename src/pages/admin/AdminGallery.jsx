import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    const res = await api.get("/gallery");
    setImages(res.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const uploadImage = async () => {
    if (!file) return alert("Select an image");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      await api.post("/gallery", formData);
      setFile(null);
      fetchImages();
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);
      fetchImages();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div>
      <h4 className="mb-3">Manage Gallery</h4>

      {/* UPLOAD */}
      <div className="card p-3 mb-4">
        <h6>Add New Image</h6>

        <input
          type="file"
          className="form-control mb-2"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-danger"
          onClick={uploadImage}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {/* IMAGES */}
      <div className="row">
        {images.map(img => (
          <div className="col-md-3 mb-4" key={img.id}>
            <div className="card shadow-sm">
              <img
  src={img.imageUrl}
  className="img-fluid"
  style={{ height: 180, objectFit: "cover" }}
/>


              <button
                className="btn btn-sm btn-danger w-100 rounded-0"
                onClick={() => deleteImage(img.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-muted">No images uploaded</p>
      )}
    </div>
  );
}
