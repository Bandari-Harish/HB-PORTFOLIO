import { useNavigate } from "react-router-dom";
import { useTheme } from "../../utilities/context/ThemeContext";
import { usePortfolio } from "../../utilities/context/PortfolioContext";
import Profile from "./Profile";
import Projects from "./Projects";
import Skills from "./Skills";
import Experience from "./Experience";
import Education from "./Education";
import Achivements from "./Achivements";
function AdminDashboardPage() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile?.profile;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <header className="dashboard-topbar">
        <div className="d-flex align-items-center gap-3">
          <span className="logo-mark">{profile?.avatar || "BH"}</span>
          <span className="logo-text">Admin Panel</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <a href="/" className="btn btn-outline-primary btn-sm rounded-pill">
            <i className="fa-solid fa-arrow-left me-1"></i> Back to Site
          </a>
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <i
              className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}
            ></i>
          </button>
          <span className="dashboard-avatar">
            <i className="ri-user-line"></i>
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm rounded-pill ms-1"
          >
            <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-heading mb-4">
          <span className="section-label">Admin</span>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle mb-0">
            Manage your portfolio details - add, edit, and delete content.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-xl-4 col-lg-5">
            <Profile />
          </div>
          <div className="col-xl-8 col-lg-7">
            <Projects />
          </div>
        </div>
        <div className="row g-4 mt-1">
          <div className="col-xl-4 col-lg-6">
            <Skills />
          </div>
          <div className="col-xl-8 col-lg-6">
            <Experience />
          </div>
        </div>
        <div className="row g-4 mt-1">
          <div className="col-xl-12 col-lg-6">
            <Education />
          </div>
        </div>
        <div className="row g-4 mt-1">
          <div className="col-xl-12 col-lg-6">
            <Achivements />
          </div>
        </div>


      </main>
    </div>
  );
}

export default AdminDashboardPage;
