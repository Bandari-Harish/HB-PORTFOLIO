import { usePortfolio } from "../utilities/context/PortfolioContext";

const typeLabel = (type) =>
  type === "fulltime"
    ? "Full-time"
    : type
      ? type.charAt(0).toUpperCase() + type.slice(1)
      : "";

const monthIndex = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

const parseStart = (period) => {
  const match = period?.match(/([A-Za-z]{3})[^\d]*(\d{4})/);
  return match ? new Date(Number(match[2]), monthIndex[match[1]] ?? 0) : null;
};

function Experience() {
  const { portfolio } = usePortfolio();
  const experiences = (portfolio.experience?.items ?? [])
    .filter((e) => e)
    .sort(
      (a, b) =>
        (parseStart(b.period) ?? 0) - (parseStart(a.period) ?? 0)
    );

  const renderCard = (exp, alignEnd) => (
    <div className="card glass-card p-6 p-md-8 hover-scale">
      <div
        className={`d-flex align-items-center gap-2 mb-3 ${alignEnd ? "justify-content-start justify-content-md-end" : ""}`}
      >
        <span className={`exp-badge exp-badge-${exp.type}`}>
          {typeLabel(exp.type)}
        </span>
      </div>
      <h3 className="fs-lg fw-semibold mb-1 timeline-title">{exp.role}</h3>
      <p className="fw-medium mb-2 fs-sm timeline-subtitle">{exp.company}</p>
      <p className="mb-1-25 fs-xs timeline-date">{exp.period}</p>
      <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
        {exp.points?.map((point, i) => (
          <li
            key={i}
            className="d-flex align-items-start gap-2 fs-sm timeline-list-item"
          >
            <span className="exp-dot"></span> {point}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="experience" className="experience py-6 position-relative">
      <div className="container">
        <div className="section-heading text-center mb-10 animate animate-in">
          <span className="section-label">Work History</span>
          <h2>My Experience</h2>
          <p>
            A journey through my professional career, highlighting roles,
            responsibilities, and key achievements.
          </p>
        </div>

        <div className="position-relative mt-14 timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-items d-flex flex-column gap-5">
            {experiences.map((exp, index) => (
              <div
                key={exp._id}
                className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-4 gap-md-0 position-relative animate animate-in"
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1-0 ps-5 ps-md-0 text-start text-md-end pe-md-5">
                      {renderCard(exp, true)}
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="flex-1-0 d-none d-md-block ps-md-5"></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1-0 d-none d-md-block pe-md-5"></div>
                    <div className="timeline-dot"></div>
                    <div className="flex-1-0 ps-5 ps-md-5">
                      {renderCard(exp, false)}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
