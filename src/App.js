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
import { Discount } from "./tabs/priceListTab/discount/discount";
import DiscountCreate from "./tabs/priceListTab/discount/discountCreate";
import VehicleEquivalenciesEditForm from "./tabs/priceListTab/vehicleEquivalencies/vehicleEquivalenciesEdit";
import Login from "./components/login";
import ProtectedRoute from "./components/protectedRoute";
import Forget from "./components/forget";
import { ResetPassword } from "./components/resetPassword";
import { ChangePassword } from "./components/changePassword";
import { Users } from "./tabs/systemTab/users/users";
import CreateUser from "./tabs/systemTab/users/createUser";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forget/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app">
                  <Sidebar />
                  <main className="content">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path='/change-password' element={<ChangePassword />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/pricelist" element={<PriceList />} />
                      <Route path="/pricelist/create" element={<NewPrice />} />
                      <Route
                        path="/pricelist/edit/:id"
                        element={<NewPrice />}
                      />
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
                        path="/pricelist/vehicleequivalency/edit/:id"
                        element={<VehicleEquivalenciesEditForm />}
                      />
                      <Route
                        path="/pricelist/extrafeesschedule"
                        element={<ExtraFeesSchedule />}
                      />
                      <Route
                        path="/pricelist/extrafeesschedule/create"
                        element={<CreateExtraFeesSchedule />}
                      />
                      <Route
                        path="/pricelist/extrafeesschedule/edit/:id"
                        element={<CreateExtraFeesSchedule />}
                      />
                      <Route
                        path="/pricelist/extrafees"
                        element={<ExtraFees />}
                      />
                      <Route
                        path="/pricelist/extrafees/create"
                        element={<ExtraFeesCreate />}
                      />
                      <Route
                        path="/pricelist/pricingzones"
                        element={<PricingZone />}
                      />

                      <Route
                        path="/pricelist/extrafees/edit/:id"
                        element={<ExtraFeesCreate />}
                      />
                      <Route
                        path="/pricelist/discounts-surcharges"
                        element={<Discount />}
                      />
                      <Route
                        path="/pricelist/discounts-surcharges/create"
                        element={<DiscountCreate />}
                      />
                      <Route
                        path="/pricelist/discounts-surcharges/edit/:id"
                        element={<DiscountCreate />}
                      />
                      <Route
                        path="/settings/system/users"
                        element={<Users />}
                      />
                      <Route
                        path="/settings/system/users/create"
                        element={<CreateUser />}
                      />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastProvider />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
