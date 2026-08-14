import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgressRead from "react-scroll-progress-read";

function MainLayout() {
  return (
    <div className="app-layout">
       <div id="progress-bar">
      <ScrollProgressRead barColor="#6366f1" height="4px" />
       </div>
      <div id="particles"></div>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
