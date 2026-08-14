import AppRoutes from "./routes/routes";
import "./global.scss";
import { ThemeProvider } from "./utilities/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
