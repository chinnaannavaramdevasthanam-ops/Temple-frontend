import { NavLink, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          console.log("Autoplay prevented. User interaction required.");
          setIsPlaying(false);
        }
      }
    };
    playAudio();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/om-namo-lakshmi-namah.mp3" type="audio/mpeg" />
      </audio>

      <nav className="temple-navbar">
        <div className="nav-container">
          
          {/* --- LEFT: LOGO & NAME --- */}
          <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <img src="/home/temple-logo.png" alt="Temple Logo" />
            <div className="brand-text">
              <span className="brand-title">Sri Satyanarayana</span>
              <span className="brand-subtitle">Swamy Temple</span>
            </div>
          </Link>

          {/* --- CENTER: LINKS --- */}
          <div className={`nav-menu-wrapper ${menuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <NavItem to="/" label="Home" closeMenu={() => setMenuOpen(false)} />
              <NavItem to="/donate" label="Donate" closeMenu={() => setMenuOpen(false)} />
              <NavItem to="/sevas" label="Seva Booking" closeMenu={() => setMenuOpen(false)} />
              <NavItem to="/gallery" label="Gallery" closeMenu={() => setMenuOpen(false)} />
              
              {token && role === "ADMIN" && (
                <NavItem to="/admin" label="Admin" closeMenu={() => setMenuOpen(false)} />
              )}
            </ul>

            {/* Mobile-Only Auth/Audio Controls */}
            <div className="mobile-controls">
               <button className="sound-btn mobile-only" onClick={toggleAudio}>
                  {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />} <span>{isPlaying ? "Mute" : "Unmute"}</span>
               </button>
               {!token ? (
                <Link to="/login" className="auth-btn mobile-only" onClick={() => setMenuOpen(false)}>Login</Link>
               ) : (
                <button className="logout-btn mobile-only" onClick={logout}>Logout</button>
               )}
            </div>
          </div>

          {/* --- RIGHT: ACTIONS (Desktop) --- */}
          <div className="nav-actions">
            <button className="sound-btn desktop-only" onClick={toggleAudio}>
              {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>

            {!token ? (
              <NavLink to="/login" className="auth-btn desktop-only">
                Login / Signup
              </NavLink>
            ) : (
              <button className="logout-btn desktop-only" onClick={logout}>
                Logout
              </button>
            )}

            {/* Hamburger Toggle */}
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}

function NavItem({ to, label, closeMenu }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/"}
        onClick={closeMenu}
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        {label}
      </NavLink>
    </li>
  );
}