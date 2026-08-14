import { usePortfolio } from "../utilities/context/PortfolioContext";

const parseStartYear = (period) => {
  const match = period?.match(/(\d{4})/);
  return match ? Number(match[1]) : null;
};

function Education() {
  const { portfolio } = usePortfolio();
  const educations = (portfolio.education?.items ?? [])
    .filter((e) => e)
    .sort(
      (a, b) =>
        (parseStartYear(b.period) ?? 0) - (parseStartYear(a.period) ?? 0)
    );

  const renderCard = (edu, alignEnd) => (
    <div
      className={`card glass-card p-6 p-md-8 hover-scale ${alignEnd ? "text-start text-md-end" : ""}`}
    >
      <div
        className={`d-flex align-items-center gap-2 mb-3 ${alignEnd ? "justify-content-start justify-content-md-end" : ""}`}
      >
        <span className="exp-badge exp-badge-fulltime">{edu.degree}</span>
      </div>
      <h3 className="fs-lg fw-semibold mb-1 timeline-title">
        {edu.field || edu.degree}
      </h3>
      <p className="fw-medium mb-2 fs-sm timeline-subtitle">{edu.institution}</p>
      <p className="mb-2 fs-xs timeline-date">
        <i className="fa-solid fa-calendar-days me-1"></i> {edu.period}
        {edu.location ? (
          <>
            <span className="mx-2">|</span>
            <i className="fa-solid fa-location-dot me-1"></i> {edu.location}
          </>
        ) : null}
      </p>
      {edu.grade ? <div className="fs-4 fw-bold gradient-text">{edu.grade}</div> : null}
    </div>
  );

  return (
    <section id="education" className="education py-6 position-relative">
      <div className="container">
        <div className="section-heading text-center mb-10 animate animate-in">
          <span className="section-label">Academic Background</span>
          <h2>Education</h2>
          <p>My formal education journey in computer science and beyond.</p>
        </div>

        <div className="position-relative mt-14 timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-items d-flex flex-column gap-5">
            {educations.map((edu, index) => (
              <div
                key={edu._id}
                className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-4 gap-md-0 position-relative animate animate-in"
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1-0 ps-5 ps-md-0 text-start text-md-end pe-md-5">
                      {renderCard(edu, true)}
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="flex-1-0 d-none d-md-block ps-md-5"></div>
                  </>
                ) : (
                  <>
                    <div className="flex-1-0 d-none d-md-block pe-md-5"></div>
                    <div className="timeline-dot"></div>
                    <div className="flex-1-0 ps-5 ps-md-5">
                      {renderCard(edu, false)}
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

export default Education;
