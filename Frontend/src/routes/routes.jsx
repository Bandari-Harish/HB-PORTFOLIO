import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layout-components/Main-Layout";
import PortfolioPage from "../pages/PortfolioPage";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import { PortfolioProvider } from "../utilities/context/PortfolioContext";
import AdminDashboardPage from "../pages/Admin Dashbaord/AdminDashboardPage";

function AppRoutes() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<PortfolioPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  );
}

export default AppRoutes;
