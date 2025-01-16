import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import { ColorModeContext , useMode } from "./theme";
import { CssBaseline , ThemeProvider } from "@mui/material";
import Dashboard from "./tabs/dashboardTab";
import Sidebar from "./components/sidebar";
import Price from "./tabs/priceListTab/priceList/price";
import NewPrice from "./tabs/priceListTab/priceList/newPrice";
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
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pricelist" element={<Price />} />
        <Route path="/pricelist/create" element={<NewPrice />} />

      </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
