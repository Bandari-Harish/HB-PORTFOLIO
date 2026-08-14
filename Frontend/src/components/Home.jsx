import { usePortfolio } from "../utilities/context/PortfolioContext";
import { TypeAnimation } from "react-type-animation";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Home() {
  const { portfolio, loading } = usePortfolio();
  const profile = portfolio.profile?.profile;
  const skills = portfolio.skills?.items ?? [];

  if (loading) {
    return (
      <section
        id="home"
        className="hero min-vh-100 d-flex align-items-center overflow-hidden"
      >
        <div className="container d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section
      id="home"
      className="hero min-vh-100 d-flex align-items-center overflow-hidden"
    >
      <div className="blur-orb orb-1"></div>
      <div className="blur-orb orb-2"></div>
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6 animate animate-in">
            <div className="hero-badge d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill fs-sm mb-3">
              {profile?.roles?.[0]}
            </div>
            <h1 className="display-4 fw-bold lh-1 mb-2">
              Hi, I'm <span className="gradient-text-3">{profile?.name}</span>
            </h1>
            <h2 className="fs-4 fw-medium text-muted mb-2">
              <TypeAnimation
                sequence={profile?.roles?.flatMap((role) => [role, 1500])}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                speed={50}
                deletionSpeed={30}
                style={{ display: "inline-block" }}
              />
            </h2>
            <p className="text-muted fs-6 mb-4">{profile?.tagline}</p>
            <div className="d-flex gap-2 flex-wrap mb-4">
              <a href="#contact" className="btn btn-gradient">
                <span>Get in Touch</span>
                <i className="fa-solid fa-arrow-right ms-1"></i>
              </a>
              <a
                href={profile?.resume || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary rounded-pill fw-semibold px-4 py-2"
              >
                <i className="fa-solid fa-download me-1"></i>
                <span>Resume</span>
              </a>
            </div>
            <div className="d-flex gap-2">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-email">{profile?.email}</Tooltip>
                }
              >
                <a
                  href={`mailto:${profile?.email}`}
                  className="hero-social-link"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope"></i>
                </a>
              </OverlayTrigger>
              <a
                href={profile?.social?.linkedin}
                target="_blank"
                className="hero-social-link"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a
                href={profile?.social?.github}
                target="_blank"
                className="hero-social-link"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="tooltip-phone">{profile?.phone}</Tooltip>
                }
              >
                <a
                  href={`tel:${profile?.phone?.replace(/[^\d+]/g, "")}`}
                  className="hero-social-link"
                  aria-label="Phone"
                >
                  <i className="fa-solid fa-phone"></i>
                </a>
              </OverlayTrigger>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center animate animate-in">
            <div className="hero-card position-relative">
              <div className="hero-card-bg position-absolute inset-0 rounded-4"></div>
              <div className="hero-card-content position-relative w-100 h-100 glass-card d-flex flex-column align-items-center justify-content-center gap-3 shadow-lg">
                <div className="avatar rounded-circle">
                  <span className="d-flex align-items-center justify-content-center w-100 h-100 rounded-circle fs-1 fw-bold">
                    {profile.avatar}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill fs-sm fw-medium hero-status">
                  <span className="status-dot"></span>
                  <span>{profile?.availability}</span>
                </div>
              </div>

              {skills
                .filter((item) => ["Angular", "React"].includes(item.name))
                .map((item) => (
                  <div
                    key={item._id}
                    className={`floating-badge ${item.name === "Angular" ? "badge-1" : "badge-2"} position-absolute d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-lg`}
                  >
                    <i className={`${item.icon} fs-5`}></i>

                    <span className="fw-semibold">{item.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
