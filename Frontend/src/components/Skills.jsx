import { usePortfolio } from "../utilities/context/PortfolioContext";

function Skills() {
  const { portfolio } = usePortfolio();
  const skills = portfolio.skills?.items ?? [];

  return (
    <section id="skills" className="skills py-6 bg-body-tertiary overflow-hidden">
      <div className="container">
        <div className="section-heading text-center mb-5 animate animate-in">
          <span className="section-label">Expertise</span>
          <h2>Skills &amp; Proficiency</h2>
          <p>
            Technologies I work with daily to build modern web applications.
          </p>
        </div>

        <div className="d-flex justify-content-center py-4 animate animate-in">
          <div className="hero-card position-relative">
            <div className="hero-card-bg position-absolute inset-0 rounded-4"></div>
            <div className="hero-card-content position-relative w-100 h-100 glass-card d-flex flex-column align-items-center justify-content-center gap-3 shadow-lg">
              <div className="avatar rounded-circle">
                <span className="d-flex align-items-center justify-content-center w-100 h-100 rounded-circle fs-1 fw-bold">
                  HB
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill fs-sm fw-medium hero-status">
                <span className="status-dot"></span>
                <span>Skills</span>
              </div>
            </div>
            {skills.map((item, index) => (
              <div
                key={item._id}
                className={`floating-badge badge-${(index % 8) + 1} position-absolute d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-lg`}
              >
                <i className={`${item.icon} fs-5`}></i>
                <span className="fw-semibold">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
