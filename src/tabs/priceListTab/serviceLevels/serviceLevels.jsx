import React from "react";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";
import ServiceLevelsGrid from "./serviceLevelsGrid";

export const Servicelevels = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Service Level Schedules", url: "/pricelist/servicelevelschedule" },
          { lable: "Service Levels", url: "/pricelist/servicelevels" },
        ]}
      />
      <div>
        <LinkBtn label="New Service Level" url={"/pricelist/servicelevels/create"} />
      </div>
      <ServiceLevelsGrid />
    </div>
  );
};
