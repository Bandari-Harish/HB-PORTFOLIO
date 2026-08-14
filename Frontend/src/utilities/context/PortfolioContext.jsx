import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../api/api.js";
const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    profile: null,
    skills: [],
    experience: [],
    education: [],
    projects: [],
    achievements: [],
  });

  const [loading, setLoading] = useState(true);
  const getData = (result, defaultValue = []) => {
    if (result.status === "fulfilled") {
      return result.value.data;
    }

    console.error("Request failed:", result.reason);

    return defaultValue;
  };
  const fetchPortfolioData = async () => {
    const [profile, skills, experience, education, projects, achievements] =
      await Promise.allSettled([
        api.get("/profile"),
        api.get("/skills"),
        api.get("/experience"),
        api.get("/education"),
        api.get("/projects"),
        api.get("/achievements"),
      ]);

    setPortfolio({
      profile: getData(profile, null),
      skills: getData(skills),
      experience: getData(experience),
      education: getData(education),
      projects: getData(projects),
      achievements: getData(achievements),
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        fetchPortfolioData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  return useContext(PortfolioContext);
};
