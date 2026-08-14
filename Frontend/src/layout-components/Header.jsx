import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useTheme } from "../utilities/context/ThemeContext";
import { usePortfolio } from "../utilities/context/PortfolioContext";

const navigation = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["experience", "Experience"],
  ["education", "Education"],
  ["projects", "Projects"],
  ["achievements", "Achievements"],
  ["contact", "Contact"],
];

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { portfolio } = usePortfolio();
  const resumeUrl = portfolio?.profile?.profile?.resume;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="navbar fixed-top py-3 py-lg-4" id="mainNav">
        <div className="container d-flex align-items-center justify-content-between">
          <a
            className="navbar-brand d-flex align-items-center gap-2 py-0"
            href="#home"
          >
            <span className="logo-mark">HB</span>
            <span className="logo-text d-none d-sm-inline">
              Bandari Harish<span className="text-primary">.</span>
            </span>
          </a>

          <div className="d-none d-lg-flex align-items-center gap-1">
            {navigation.map(([id, label]) => (
              <a
                key={id}
                className={`nav-link-custom ${activeSection === id ? "active" : ""}`}
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="d-none d-lg-flex align-items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              id="themeToggleDesktop"
              aria-label="Toggle theme"
            >
              <i
                className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}
              ></i>
            </button>
            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-resume"
            >
              <i className="ri-download-line me-1"></i> Resume
            </a>
            <Link to="/login" className="btn-login">
              <i className="ri-login-box-line me-1"></i> Login
            </Link>
          </div>

          <div className="d-flex d-lg-none align-items-center gap-2">
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              id="themeToggleMobile"
              aria-label="Toggle theme"
            >
              <i
                className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}
              ></i>
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-btn"
              id="menuToggle"
              aria-label="Toggle menu"
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
            </button>
          </div>
        </div>

        <div
          className={`mobile-overlay ${menuOpen ? "open" : ""}`}
          id="mobileOverlay"
        >
          <nav className="mobile-nav">
            {navigation.map(([id, label]) => (
              <a
                key={id}
                className={`mobile-nav-link ${activeSection === id ? "active" : ""}`}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-resume mt-4"
              onClick={() => setMenuOpen(false)}
            >
              <i className="ri-download-line me-2"></i> Download Resume
            </a>
            <Link
              to="/login"
              className="btn-login"
              onClick={() => setMenuOpen(false)}
            >
              <i className="ri-login-box-line me-2"></i> Login
            </Link>
          </nav>
        </div>
      </nav>
    </>
  );
}

export default Header;
