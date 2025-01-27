import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/navbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./tabs/dashboardTab";
import Sidebar from "./components/sidebar";
import NewPrice from "./tabs/priceListTab/priceList/newPrice";
import VehiclesTypes from "./tabs/priceListTab/vehiclesTypes/vehiclesTypes";
import PriceList from "./tabs/priceListTab/priceList/priceList";
import { ExtraFeesSchedule } from "./tabs/priceListTab/extraFeesSchedule/extraFeesSchedule";
import CreateExtraFeesSchedule from "./tabs/priceListTab/extraFeesSchedule/createExtraFeesSchedule";
import { ExtraFees } from "./tabs/priceListTab/extraFees/extraFees";
import ExtraFeesCreate from "./tabs/priceListTab/extraFees/extraFeesCreate";
import VehicleEquivalencies from "./tabs/priceListTab/vehicleEquivalencies/vehicleEquivalencies";
import VehiclesTypesCreate from "./tabs/priceListTab/vehiclesTypes/vehiclesTypesCreate";
import VehicleEquivalenciesCreate from "./tabs/priceListTab/vehicleEquivalencies/vehicleEquivalenciesCreate";
import { useEffect } from "react";
import { postRequest } from "./consts/apiCalls";
import size from "lodash/size";
import ToastProvider from "./components/toast/ToastProvider";
import PricingZone from "./tabs/priceListTab/pricingZone/pricingZone";

function App() {
  const [theme, colorMode] = useMode();

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
              <Route path="/pricelist" element={<PriceList />} />
              <Route path="/pricelist/create" element={<NewPrice />} />
              <Route
                path="/pricelist/vehiclestype"
                element={<VehiclesTypes />}
              />
              <Route
                path="/pricelist/vehiclestype/create"
                element={<VehiclesTypesCreate />}
              />
              <Route
                path="/pricelist/vehiclestype/edit/:id"
                element={<VehiclesTypesCreate />}
              />
              <Route
                path="/pricelist/vehicleequivalencies"
                element={<VehicleEquivalencies />}
              />
              <Route
                path="/pricelist/vehicleequivalencies/create"
                element={<VehicleEquivalenciesCreate />}
              />
              <Route
                path="/pricelist/extrafeesschedule"
                element={<ExtraFeesSchedule />}
              />
              <Route
                path="/pricelist/extrafeesschedule/create"
                element={<CreateExtraFeesSchedule />}
              />
              <Route path="/pricelist/extrafees" element={<ExtraFees />} />
              <Route
                path="/pricelist/extrafees/create"
                element={<ExtraFeesCreate />}
              />
              <Route
                path="/pricelist/pricingzones"
                element={<PricingZone />}
              />
            </Routes>
          </main>
        </div>
        <ToastProvider />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
