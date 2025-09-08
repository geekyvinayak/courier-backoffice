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
import ToastProvider from "./components/toast/ToastProvider";
import PricingZone from "./tabs/priceListTab/pricingZone/pricingZone";
import { Discount } from "./tabs/priceListTab/discount/discount";
import { ServicelevelSchedule } from "./tabs/priceListTab/serviceLevelSchedule/serviceLevelSchedule";
import DiscountCreate from "./tabs/priceListTab/discount/discountCreate";
import VehicleEquivalenciesEditForm from "./tabs/priceListTab/vehicleEquivalencies/vehicleEquivalenciesEdit";
import Login from "./components/login";
import ProtectedRoute from "./components/protectedRoute";
import Forget from "./components/forget";
import { ResetPassword } from "./components/resetPassword";
import { ChangePassword } from "./components/changePassword";
import { Users } from "./tabs/settingsTab/system/users/users";
import CreateUser from "./tabs/settingsTab/system/users/createUser";
import { Servicelevels } from "./tabs/priceListTab/serviceLevels/serviceLevels";
import CreateServiceLevel from "./tabs/priceListTab/serviceLevels/createSeviceLevel";
import CreateServiceLevelSchedule from "./tabs/priceListTab/serviceLevelSchedule/createServiceLevelSchedule";
import { Address } from "./tabs/settingsTab/system/address/address";
import CreateAddress from "./tabs/settingsTab/system/address/createAddress";
import { FuleSurchargesCalculator } from "./tabs/priceListTab/fuleSurcharges/fuleSurchargesCalculator";
import FuleSurchargesCalculatorCreate from "./tabs/priceListTab/fuleSurcharges/fuleSurchargeCalculatorCreate";
import { FuelPrices } from "./tabs/priceListTab/fulePrices/fulePrices";
import CreateFuelPrice from "./tabs/priceListTab/fulePrices/createFuelPrice";
import ConfigrationsTab from "./tabs/settingsTab/configurations";
import CompaniesTab from "./tabs/settingsTab/Companies";
import ZonesTab from "./tabs/settingsTab/Zones";
import CheckpointsTab from "./tabs/settingsTab/Checkpoints";
import { FuleSurchargesTable } from "./tabs/priceListTab/fuleSurchargeTable/fuleSurchargeTable";
import FuleSurchargeTableCreate from "./tabs/priceListTab/fuleSurchargeTable/fuleSurchargeTableCreate";
import { FuleSurchargesSchedule } from "./tabs/priceListTab/fuleSurchargesSchedule/fuleSurchargesSchedule";
import FuelSurchargeScheduleCreate from "./tabs/priceListTab/fuleSurchargesSchedule/fuleSurchargeScheduleCreate";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
                      <Route path="/change-password" element={<ChangePassword />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/pricelist" element={<PriceList />} />
                      <Route path="/pricelist/create" element={<NewPrice />} />
                      <Route path="/pricelist/edit/:id" element={<NewPrice />} />
                      <Route path="/pricelist/vehiclestype" element={<VehiclesTypes />} />
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
                      <Route path="/pricelist/extrafeesschedule" element={<ExtraFeesSchedule />} />
                      <Route
                        path="/pricelist/extrafeesschedule/create"
                        element={<CreateExtraFeesSchedule />}
                      />
                      <Route
                        path="/pricelist/extrafeesschedule/edit/:id"
                        element={<CreateExtraFeesSchedule />}
                      />
                      <Route path="/pricelist/extrafees" element={<ExtraFees />} />
                      <Route path="/pricelist/extrafees/create" element={<ExtraFeesCreate />} />
                      <Route path="/pricelist/pricingzones" element={<PricingZone />} />

                      <Route path="/pricelist/extrafees/edit/:id" element={<ExtraFeesCreate />} />
                      <Route path="/pricelist/discounts-surcharges" element={<Discount />} />
                      <Route
                        path="/pricelist/discounts-surcharges/create"
                        element={<DiscountCreate />}
                      />
                      <Route
                        path="/pricelist/discounts-surcharges/edit/:id"
                        element={<DiscountCreate />}
                      />
                      <Route
                        path="/pricelist/servicelevelschedule"
                        element={<ServicelevelSchedule />}
                      />
                      <Route
                        path="/pricelist/servicelevelschedule/create"
                        element={<CreateServiceLevelSchedule />}
                      />
                      <Route
                        path="/pricelist/servicelevelschedule/edit/:id"
                        element={<CreateServiceLevelSchedule />}
                      />
                      <Route path="/pricelist/servicelevels" element={<Servicelevels />} />
                      <Route
                        path="/pricelist/servicelevels/create"
                        element={<CreateServiceLevel />}
                      />
                      <Route
                        path="/pricelist/servicelevels/edit/:id"
                        element={<CreateServiceLevel />}
                      />
                      <Route path="/settings/system/users" element={<Users />} />
                      <Route path="/settings/system/users/create" element={<CreateUser />} />
                      <Route path="settings/system/users/edit/:id" element={<CreateUser />} />
                      <Route path="settings/system/address" element={<Address />} />
                      <Route
                        path="/settings/system/address/create/:form"
                        element={<CreateAddress />}
                      />
                      <Route
                        path="/pricelist/surcharge-calculator"
                        element={<FuleSurchargesCalculator />}
                      />
                      <Route
                        path="/pricelist/surcharge-calculator/create"
                        element={<FuleSurchargesCalculatorCreate />}
                      />
                      <Route
                        path="/pricelist/surcharge-calculator/create/:id"
                        element={<FuleSurchargesCalculatorCreate />}
                      />
                      <Route path="/pricelist/fuel-prices" element={<FuelPrices />} />
                      <Route path="/pricelist/fuel-prices/create" element={<CreateFuelPrice />} />
                      <Route
                        path="/pricelist/fuel-prices/create/:id"
                        element={<CreateFuelPrice />}
                      />
                      <Route
                        path="/settings/system/address/edit/:form/:id"
                        element={<CreateAddress />}
                      />
                      <Route path="/pricelist/fuel-surcharges-table" element={<FuleSurchargesTable/>} />
                      <Route path="/pricelist/fuel-surcharges-table/create" element={<FuleSurchargeTableCreate/>} />
                      <Route path="/pricelist/fuel-surcharges-table/edit/:id" element={<FuleSurchargeTableCreate/>} />
                      <Route path="/pricelist/fuel-surcharges-schedule" element={<FuleSurchargesSchedule/>} />
                      <Route path="/pricelist/fuel-surcharges-schedule/create" element={<FuelSurchargeScheduleCreate />} />
                      <Route path="/pricelist/fuel-surcharges-schedule/edit/:id" element={<FuelSurchargeScheduleCreate />} />

                      <Route path="/settings/configurations/*" element={<ConfigrationsTab />} />
                      <Route path="/settings/companies/*" element={<CompaniesTab />} />
                      <Route path="/settings/zones/*" element={<ZonesTab />} />
                      <Route path="/settings/checkpoints/*" element={<CheckpointsTab />} />
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
