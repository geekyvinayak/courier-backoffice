import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";
import FuelPricesGrid from "./fuelPriceGrid";

export const FuelPrices = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule" },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table" },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices" },
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
        ]}
      />
      <div>
        <LinkBtn label="New Fuel Price" url={"/pricelist/fuel-prices/create"} />
      </div>
      <FuelPricesGrid />
    </div>
  );
};
