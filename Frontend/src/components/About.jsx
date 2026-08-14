import { usePortfolio } from "../utilities/context/PortfolioContext";

function About() {
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile?.profile;

  const stats = profile?.stats ?? {};

  return (
    <section id="about" className="about py-6">
      <div className="container">
        <div className="section-heading text-center mb-5 animate animate-in">
          <span className="section-label">About Me</span>
          <h2>Get To Know Me Better</h2>
          <p>
            A passionate developer who loves building beautiful, functional, and
            accessible web experiences.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5 animate animate-in">
            <div className="card glass-card border-0 shadow-sm p-4 p-md-5 h-100">
              <div className="icon-box">
                <i className="ri-user-3-line"></i>
              </div>
              <h3 className="fs-5 fw-semibold mb-3">Who I Am</h3>
              <p className="text-muted lh-lg mb-4 small">
                {profile?.about}
              </p>
              <div className="open-to-work-badge">
                <i className="ri-sparkling-line"></i>
                <span>{profile?.availability}</span>
              </div>
            </div>
          </div>
          <div className="col-lg-7 animate animate-in">
            <div className="card glass-card border-0 shadow-sm p-4 p-md-5 h-100">
              <h3 className="fs-5 fw-semibold mb-4">Career Objective</h3>
              <div className="quote-block p-3 p-md-4 rounded-3 mb-4">
                <p className="mb-0 small lh-lg text-muted">
                  <i className="ri-double-quotes-l text-primary me-1"></i>
                  {profile?.objective}
                  <i className="ri-double-quotes-r text-primary ms-1"></i>
                </p>
              </div>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="about-info-item d-flex align-items-start gap-3 p-3 rounded-3">
                    <div className="icon-box-sm">
                      <i className="ri-map-pin-line"></i>
                    </div>
                    <div>
                      <div className="text-muted small mb-0">Location</div>
                      <div className="fw-medium small">{profile?.location}</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-info-item d-flex align-items-start gap-3 p-3 rounded-3">
                    <div className="icon-box-sm">
                      <i className="ri-graduation-cap-line"></i>
                    </div>
                    <div>
                      <div className="text-muted small mb-0">Education</div>
                      <div className="fw-medium small">{profile?.education}</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-info-item d-flex align-items-start gap-3 p-3 rounded-3">
                    <div className="icon-box-sm">
                      <i className="ri-global-line"></i>
                    </div>
                    <div>
                      <div className="text-muted small mb-0">Languages</div>
                      <div className="fw-medium small">
                        {profile?.languages?.join(", ")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="about-info-item d-flex align-items-start gap-3 p-3 rounded-3">
                    <div className="icon-box-sm">
                      <i className="ri-briefcase-line"></i>
                    </div>
                    <div>
                      <div className="text-muted small mb-0">Experience</div>
                      <div className="fw-medium small">{profile?.experience}</div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-2 opacity-25" />
              <div className="row g-3 pt-3">
                <div className="col-6 col-md-3 text-center">
                  <div className="fs-1 fw-bold lh-1 mb-1 gradient-text">
                    <span className="stat-number" data-count={stats.projects ?? 0}>
                      {stats.projects ?? 0}
                    </span>
                    <span className="counter-suffix">+</span>
                  </div>
                  <span className="small text-muted text-uppercase about-stat-label">
                    Projects
                  </span>
                </div>
                <div className="col-6 col-md-3 text-center">
                  <div className="fs-1 fw-bold lh-1 mb-1 gradient-text">
                    <span
                      className="stat-number"
                      data-count={stats.technologies ?? 0}
                    >
                      {stats.technologies ?? 0}
                    </span>
                    <span className="counter-suffix">+</span>
                  </div>
                  <span className="small text-muted text-uppercase about-stat-label">
                    Technologies
                  </span>
                </div>
                <div className="col-6 col-md-3 text-center">
                  <div className="fs-1 fw-bold lh-1 mb-1 gradient-text">
                    <span
                      className="stat-number"
                      data-count={stats.githubRepos ?? 0}
                    >
                      {stats.githubRepos ?? 0}
                    </span>
                    <span className="counter-suffix">+</span>
                  </div>
                  <span className="small text-muted text-uppercase about-stat-label">
                    GitHub Repos
                  </span>
                </div>
                <div className="col-6 col-md-3 text-center">
                  <div className="fs-1 fw-bold lh-1 mb-1 gradient-text">
                    <span
                      className="stat-number"
                      data-count={stats.codingHours ?? 0}
                    >
                      {stats.codingHours ?? 0}
                    </span>
                    <span className="counter-suffix">+</span>
                  </div>
                  <span className="small text-muted text-uppercase about-stat-label">
                    Coding Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
