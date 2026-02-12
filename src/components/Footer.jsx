import { Link } from "react-router-dom";
import "./Footer.css"; 

export default function Footer() {
  return (
    <footer className="temple-footer">
      <div className="container py-5">
        <div className="row text-center text-md-start align-items-center">

          {/* --- COLUMN 1: QUICK LINKS --- */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/sevas">Seva Booking</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/donate">Donate</Link></li>
            </ul>
          </div>

          {/* --- COLUMN 2: LOGO & BRAND --- */}
          <div className="col-md-4 mb-4 mb-md-0 text-center">
            <div className="footer-logo-wrapper">
              <img src="/home/temple-logo.webp" alt="Temple Logo" className="footer-logo" />
            </div>
            <h5 className="footer-brand">Sri Satyanarayana<br/>Swamy Temple</h5>
            <p className="footer-tagline">|| Om Namo Narayanaya ||</p>
          </div>

          {/* --- COLUMN 3: CONTACT --- */}
          <div className="col-md-4">
            <h6 className="footer-title">Contact Us</h6>
            <div className="contact-info">
              <p>
                <strong>Email:</strong><br/>
                <a href="mailto:chinnaannavaramdevasthanam@gmail.com" className="contact-link">
                  chinnaannavaramdevasthanam@gmail.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong><br/>
                <span className="contact-number">+91 99999 99999</span>
              </p>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        {/* --- COPYRIGHT --- */}
        <div className="text-center copyright-text">
          <p>© {new Date().getFullYear()} SRI SATYANARAYANA SWAMY TEMPLE. All rights reserved.</p>
          <p className="dev-credits">Designed with Devotion</p>
        </div>
      </div>
    </footer>
  );
}