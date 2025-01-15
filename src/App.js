import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import { ColorModeContext , useMode } from "./theme";
import { CssBaseline , ThemeProvider } from "@mui/material";
import Dashboard from "./tabs/dashboard";
import Sidebar from "./components/sidebar";
function App() {
  const [theme , colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="app">
      <Sidebar />
      <main className="content">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
