import { Link } from "react-router-dom";
import "./Home.css"; 

export default function Home() {
  return (
    <div className="home-page-wrapper">
      
      {/* 1. Welcome Strip */}
      <div className="welcome-strip">
        <h4>|| OM NAMO NARAYANAYA ||</h4>
      </div>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-frame">
          <img
            src="/home/img1.webp"
            alt="Sri Satyanarayana Swamy Temple"
            className="hero-image"
            fetchpriority="high"
          />
          <div className="hero-overlay-text">
            <h1>Sri Satyanarayana Swamy Temple</h1>
            <p>Sanctuary of Peace & Devotion</p>
          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="section-divider">
        <span className="om-symbol">ॐ</span>
      </div>

      {/* 3. Popular Sevas */}
      <section className="popular-sevas-section">
        <h2 className="devotional-title">✦ Popular Sevas ✦</h2>
        <p className="section-subtitle">Participate in sacred rituals and seek blessings</p>

        <div className="popular-sevas-grid">
          {[
            { img: "/home/archana.webp", name: "Archana" },
            { img: "/home/abhishekam.webp", name: "Abhishekam" },
            { img: "/home/satyanarayana.webp", name: "Satyanarayana Vratam" },
          ].map((s, i) => (
            <div className="seva-card" key={i}>
              <div className="img-container">
                <img src={s.img} alt={s.name} className="seva-image" />
              </div>
              <div className="seva-name">{s.name}</div>
            </div>
          ))}
        </div>

        <div className="view-more-wrapper">
          <Link to="/sevas" className="gold-btn">
            View All Sevas
          </Link>
        </div>
      </section>

      {/* 4. History Preview Section */}
      <section className="history-preview-section">
        <div className="history-card-home">
          <div className="history-content">
            <h3 className="history-title">Temple History</h3>
            <div className="divider-small"></div>
            <p>
              Established with divine blessings, the <strong>Sri Satyanarayana Swamy Temple</strong>, 
              affectionately known as "Chinna Annavaram," stands as a beacon of faith. 
              Founded by Sri Suresh Kondeti, it serves as a spiritual haven for thousands...
            </p>
            <Link to="/history" className="read-more-btn">
              Read Full History
            </Link>
          </div>
          <div className="history-image-wrapper">
             <img
              src="/home/history1.webp"
              alt="Temple History"
              className="history-preview-img"
            />
          </div>
        </div>
      </section>

    </div>
  );
}