import { useEffect, useState } from "react";
import { usePortfolio } from "../utilities/context/PortfolioContext";

const quickLinks = [
  ["#home", "Home"],
  ["#about", "About"],
  ["#skills", "Skills"],
  ["#experience", "Experience"],
  ["#education", "Education"],
  ["#projects", "Projects"],
  ["#achievements", "Achievements"],
  ["#contact", "Contact"],
];

function SocialLinks({ profile }) {
  return (
    <div className="d-flex gap-2">
      <a
        href={profile?.social?.linkedin}
        target="_blank"
        rel="noreferrer"
        className="footer-social-link"
        aria-label="LinkedIn"
      >
        <i className="fa-brands fa-linkedin-in"></i>
      </a>
      <a
        href={profile?.social?.github}
        target="_blank"
        rel="noreferrer"
        className="footer-social-link"
        aria-label="GitHub"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      
    </div>
  );
}

function QuickLinks() {
  return (
    <ul className="list-unstyled mb-0 footer-quick-links-grid">
      {quickLinks.map(([href, label]) => (
        <li key={href}>
          <a href={href} className="footer-link">
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ContactList({ profile }) {
  const rows = [
    ["fa-solid fa-envelope", profile?.email, `mailto:${profile?.email}`],
    [
      "fa-solid fa-phone",
      profile?.phone,
      `tel:${profile?.phone?.replace(/[^\d+]/g, "")}`,
    ],
    ["fa-solid fa-location-dot", profile?.location, null],
  ];

  return (
    <ul className="list-unstyled mb-0 d-flex flex-column gap-3 footer-contact-list">
      {rows.map(([icon, value, href], i) => (
        <li key={i} className="d-flex align-items-center gap-3">
          <span className="footer-contact-icon">
            <i className={icon}></i>
          </span>
          {href ? (
            <a href={href} className="footer-contact-text">
              {value}
            </a>
          ) : (
            <span className="footer-contact-text">{value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function FooterCta({ profile }) {
  return (
    <footer className="footer footer-cta py-0 text-white">
      <div className="container py-5">
        <div className="footer-cta-band rounded-4 p-4 p-md-5 mb-5 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div>
            <h4 className="fw-bold mb-1">Let's build something together.</h4>
            <p className="mb-0 text-white-50 small">
              Have a project in mind? I'd love to hear about it.
            </p>
          </div>
          <a
            href="#contact"
            className="btn footer-cta-btn rounded-pill px-4 py-2 fw-semibold"
          >
            <i className="fa-solid fa-paper-plane me-2"></i>Get in Touch
          </a>
        </div>
        <div className="row g-4 g-lg-5 pb-4">
          <div className="col-md-6 col-lg-5">
            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="footer-brand-logo">BH</span>
              <div className="text-start">
                <h5 className="fw-bold mb-0">{profile?.name}</h5>
                <p className="text-white-50 small mb-0">{profile?.roles?.[0]}</p>
              </div>
            </div>
            <p className="text-white-50 small mb-4">{profile?.tagline}</p>
            <div>
              <SocialLinks profile={profile} />
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <h6 className="footer-heading mb-3">Quick Links</h6>
            <QuickLinks />
          </div>
          <div className="col-md-6 col-lg-4">
            <h6 className="footer-heading mb-3">Contact</h6>
            <ContactList profile={profile} />
          </div>
        </div>
        <div className="pt-3 border-top border-light border-opacity-10 text-center">
          <p className="small text-white-50 mb-0">
            &copy; {new Date().getFullYear()} {profile?.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Footer() {
  const { portfolio } = usePortfolio();
  const profile = portfolio.profile?.profile;
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <FooterCta profile={profile} />

      <button
        id="back-to-top"
        className={`btn btn-gradient rounded-3 p-0 d-flex align-items-center justify-content-center position-fixed ${showTop ? "visible" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </>
  );
}

export default Footer;
