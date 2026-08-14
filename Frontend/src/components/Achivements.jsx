import { usePortfolio } from "../utilities/context/PortfolioContext";

function Achivements() {
  const { portfolio } = usePortfolio();
  const achievements = portfolio.achievements?.items ?? [];

  return (
    <section id="achievements" className="achievements py-6 bg-body-tertiary">
      <div className="container">
        <h2 className="section-title text-center mb-5 animate animate-in">
          Achievements
        </h2>
        <div className="row g-3">
          {achievements.map((item) => (
            <div key={item._id} className="col-md-6 animate animate-in">
              <div className="card glass-card border-0 shadow-sm p-4 text-center h-100 d-flex flex-column align-items-center gap-2">
                <div className="achieve-icon d-flex align-items-center justify-content-center rounded-3">
                  <i className={`${item.icon} fs-5`}></i>
                </div>
                <p className="fw-medium small mb-0">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achivements;
