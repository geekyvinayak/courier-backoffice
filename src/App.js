import { Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import { ColorModeContext , useMode } from "./theme";
import { CssBaseline , ThemeProvider } from "@mui/material";
import Dashboard from "./tabs/dashboardTab";
import Sidebar from "./components/sidebar";
import NewPrice from "./tabs/priceListTab/priceList/newPrice";
import PriceList from "./tabs/priceListTab/priceList/priceList";
import { ExtraFeesSchedule } from "./tabs/priceListTab/extraFeesSchedule/extraFeesSchedule";
import CreateExtraFeesSchedule from "./tabs/priceListTab/extraFeesSchedule/createExtraFeesSchedule";


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
        <Route path="/pricelist" element={<PriceList />} />
        <Route path="/pricelist/create" element={<NewPrice />} />
        <Route path="/pricelist/extrafeesschedule" element={<ExtraFeesSchedule />} />
        <Route path="/pricelist/extrafeesschedule/create" element={<CreateExtraFeesSchedule />} />
      </Routes>
      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
