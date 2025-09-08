import React from "react";
import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";
import VehiclesTypeGrid from "./vehiclesTypeGrid";

const VehiclesTypes = () => {
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
        <LinkBtn label="New Vehicle Type" url={"/pricelist/vehiclestype/create"} className="ml-4" />
      </div>
      <VehiclesTypeGrid />
    </div>
  );
};

export default VehiclesTypes;
