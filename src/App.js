import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import { ColorModeContext , useMode } from "./theme";
import { CssBaseline , ThemeProvider } from "@mui/material";
import Dashboard from "./tabs/dashboardTab";
import Sidebar from "./components/sidebar";
// import Pricelist from "./tabs/pricelistTab/pricelist";
// import Vehicles from "./tabs/pricelistTab/vehicles";
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
        {/* <Route path="/pricelist" element={<Pricelist />} />
        <Route path="/pricelist/Vehicles" element={<Vehicles />} /> */}
      </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
