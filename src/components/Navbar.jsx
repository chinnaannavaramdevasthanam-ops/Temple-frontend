import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute, FaBars, FaTimes } from "react-icons/fa";
import api from "../services/api";
import "./Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Fetch user but DO NOT block UI
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  const role = user?.role;

  const [audio] = useState(new Audio("/audio/om-namo-lakshmi-namah.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;

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
    } catch (error) {}

    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  return (
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

            {/* Show Admin only after user loaded */}
            {!loading && user && role === "ADMIN" && (
              <NavItem to="/admin" label="Admin" closeMenu={() => setMenuOpen(false)} />
            )}
          </ul>

          {/* Mobile Controls */}
          <div className="mobile-controls">
            <button className="sound-btn mobile-only" onClick={toggleAudio}>
              {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
              <span>{isPlaying ? "Mute" : "Unmute"}</span>
            </button>

            {!loading && !user ? (
              <Link
                to="/login"
                className="auth-btn mobile-only"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : !loading && user ? (
              <button className="logout-btn mobile-only" onClick={logout}>
                Logout
              </button>
            ) : null}
          </div>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="nav-actions">
          <button className="sound-btn desktop-only" onClick={toggleAudio}>
            {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>

          {!loading && !user ? (
            <NavLink to="/login" className="auth-btn desktop-only">
              Login / Signup
            </NavLink>
          ) : !loading && user ? (
            <button className="logout-btn desktop-only" onClick={logout}>
              Logout
            </button>
          ) : null}

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>
    </nav>
  );
}

function NavItem({ to, label, closeMenu }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === "/"}
        onClick={closeMenu}
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
