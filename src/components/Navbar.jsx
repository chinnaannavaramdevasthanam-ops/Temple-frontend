import { NavLink, Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  FaVolumeUp,
  FaVolumeMute,
  FaBars,
  FaTimes
} from "react-icons/fa";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ADMIN or USER
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  /* AUTOPLAY AUDIO @ 50% */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.volume = 0.5;
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
  };

  return (
    <>
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/om-namo-lakshmi-namah.mp3" type="audio/mpeg" />
      </audio>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.container}>

          {/* LOGO */}
          <Link to="/" style={styles.brand}>
            <img src="/home/temple-logo.png" alt="Temple Logo" style={styles.logo} />
            <span style={styles.title}>
              Sri Satyanarayana Swamy Temple
            </span>
          </Link>

          {/* MOBILE ICON */}
          <button
            style={styles.menuIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* MENU */}
          <ul
            style={{
              ...styles.menu,
              ...(menuOpen ? styles.menuMobileOpen : {})
            }}
          >
            {/* SOUND */}
            <li>
              <button onClick={toggleAudio} style={styles.soundBtn}>
                {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>
            </li>

            <NavItem to="/" label="Home" setMenuOpen={setMenuOpen} />
            <NavItem to="/donate" label="Donate" setMenuOpen={setMenuOpen} />
            <NavItem to="/sevas" label="Seva Booking" setMenuOpen={setMenuOpen} />
            <NavItem to="/gallery" label="Gallery" setMenuOpen={setMenuOpen} />

            {/* ADMIN PANEL LINK */}
            {token && role === "ADMIN" && (
              <NavItem
                to="/admin"
                label="Admin Panel"
                setMenuOpen={setMenuOpen}
              />
            )}

            {/* AUTH */}
            {!token ? (
              <li>
                <NavLink
                  to="/login"
                  style={styles.authBtn}
                  onClick={() => setMenuOpen(false)}
                >
                  Login / Signup
                </NavLink>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  style={styles.logoutBtn}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

/* NAV ITEM */
function NavItem({ to, label, setMenuOpen }) {
  return (
    <li>
      <NavLink
        to={to}
        end
        onClick={() => setMenuOpen(false)}
        style={({ isActive }) => ({
          ...styles.link,
          ...(isActive ? styles.activeLink : {})
        })}
      >
        {label}
      </NavLink>
    </li>
  );
}

/* STYLES */
const styles = {
  navbar: {
    background: "linear-gradient(90deg, #061a3a, #0b2a5b)",
    padding: "14px 0",
    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
    position: "relative"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none"
  },
  logo: {
    height: "44px"
  },
  title: {
    color: "#f5c542",
    fontSize: "18px",
    fontWeight: "600"
  },
  menuIcon: {
    display: "none",
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "22px",
    cursor: "pointer"
  },
  menu: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    gap: "26px",
    margin: 0,
    padding: 0
  },
  menuMobileOpen: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#061a3a",
    flexDirection: "column",
    padding: "20px",
    gap: "18px"
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    paddingBottom: "6px"
  },
  activeLink: {
    borderBottom: "3px solid #f5c542"
  },
  soundBtn: {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer"
  },
  authBtn: {
    padding: "6px 14px",
    border: "1px solid #f5c542",
    borderRadius: "20px",
    color: "#f5c542",
    textDecoration: "none",
    fontSize: "13px"
  },
  logoutBtn: {
    padding: "6px 14px",
    border: "1px solid #f5c542",
    borderRadius: "20px",
    background: "transparent",
    color: "#f5c542",
    fontSize: "13px",
    cursor: "pointer"
  }
};

/* MEDIA QUERY */
if (window.innerWidth <= 768) {
  styles.menuIcon.display = "block";
  styles.menu.display = "none";
}
