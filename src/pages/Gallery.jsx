import { useEffect, useState } from "react";
import api from "../services/api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center">Loading gallery...</p>;
  }

  if (images.length === 0) {
    return <p className="text-center">No images uploaded yet</p>;
  }

  return (
    <>
      <h3 className="mb-4 text-center">Temple Gallery</h3>

      <div className="row">
        {images.map(img => (
          <div className="col-md-4 col-sm-6 mb-4" key={img.id}>
            <img
              src={img.imageUrl}   
              alt="Temple"
              loading="lazy"
              className="img-fluid rounded shadow-sm"
              style={{
                height: 220,
                width: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
