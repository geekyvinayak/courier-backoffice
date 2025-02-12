import React from "react";
import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";
import VehicleEquivalenciesGrid from "./vehicleEquivalenciesGrid";

const VehicleEquivalencies = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Vehicle Types", url: "/pricelist/vehiclestype" },
          {
            lable: "Vehicle Equivalencies",
            url: "/pricelist/vehicleequivalencies",
          },
        ]}
      />
      <div>
        <LinkBtn
          label="New Vehicle Equivalency"
          url={"/pricelist/vehicleequivalencies/create"}
        />
      </div>
      <VehicleEquivalenciesGrid />
    </div>
  );
};

export default VehicleEquivalencies;
