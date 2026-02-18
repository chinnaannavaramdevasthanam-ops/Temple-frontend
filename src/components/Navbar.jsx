import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes } from "react-icons/fa";
import api from "../services/api";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);

useEffect(() => {
  api.get("/auth/me")
    .then(res => setUser(res.data))
    .catch(() => setUser(null));
}, []);

const token = user;
const role = user?.role;


  const navigate = useNavigate();

  // FIX: Use JavaScript Audio object instead of HTML tag to prevent "ghost lines"
  const [audio] = useState(new Audio("/audio/om-namo-lakshmi-namah.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Configure audio
    audio.loop = true;
    audio.volume = 0.4;

    // Auto-play attempt
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Autoplay prevented by browser:", error);
          setIsPlaying(false);
        });
    }

    // Cleanup when component unmounts (rare for Navbar, but good practice)
    return () => {
      audio.pause();
    };
  }, [audio]);

  const toggleAudio = () => {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch {}
  setUser(null);
  navigate("/");
  setMenuOpen(false);
};


  return (
    <>
      {/* NO AUDIO TAG HERE - Keeps the layout clean */}

      <nav className="temple-navbar">
        <div className="nav-container">
          
          {/* --- LEFT: LOGO & NAME --- */}
          <Link to="/" className="nav-brand" onClick={() => setMenuOpen(false)}>
            <img src="/home/temple-logo.webp" alt="Temple Logo" />
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