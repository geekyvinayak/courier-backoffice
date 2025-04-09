import React from "react";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";
import ServiceLevelScheduleGrid from "./serviceLevelScheduleGrid";

export const ServicelevelSchedule = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Service Level Schedules", url: "/pricelist/servicelevelschedule" },
          { lable: "Service Levels", url: "/pricelist/servicelevels" },
        ]}
      />
      <div>
        <LinkBtn
          label="New Schedule"
          url={"/pricelist/servicelevelschedule/create"}
        />
      </div>
      <ServiceLevelScheduleGrid />
    </div>
  );
};
