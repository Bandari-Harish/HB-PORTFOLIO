import { usePortfolio } from "../utilities/context/PortfolioContext";

function Projects() {
  const { portfolio } = usePortfolio();
  const projects = (portfolio.projects?.items ?? []).filter(
    (project) => project?.status === "published"
  );

  return (
    <section id="projects" className="projects py-6">
      <div className="container">
        <div className="section-heading text-center mb-5 animate animate-in">
          <span className="section-label">My Work</span>
          <h2>Featured Projects</h2>
          <p>Real-world applications built with modern frontend technologies.</p>
        </div>
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={project._id} className="col-md-4 animate animate-in">
              <div className="card glass-card border-0 overflow-hidden group">
                <div className="overflow-hidden">
                  <div
                    className={`project-card-banner project-card-banner-${(index % 4) + 1} group-hover-scale d-flex align-items-center justify-content-center fs-1 text-white`}
                  >
                    <i className={project.icon}></i>
                  </div>
                </div>
                <div className="p-4">
                  <span className="d-inline-block px-2 py-1 rounded-3 text-xs fw-semibold mb-3 project-tech-badge">
                    {project.category}
                  </span>
                  <h6 className="fw-bold mb-2">{project.title}</h6>
                  {project.period ? (
                    <p className="text-muted small mb-1">
                      <i className="fa-regular fa-calendar me-1"></i>{" "}
                      {project.period}
                    </p>
                  ) : null}
                  <p className="text-muted small line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="d-flex flex-wrap gap-1 mb-3">
                    {project.tech?.map((tech, i) => (
                      <span key={i} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-2">
                    <a
                      href={project.github || "#"}
                      className="btn btn-outline-secondary btn-sm flex-fill"
                    >
                      <i className="fa-brands fa-github me-1"></i> Code
                    </a>
                    <a
                      href={project.demo || "#"}
                      className="btn btn-primary btn-sm flex-fill"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square me-1"></i>{" "}
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
