import React from "react";
import ExtraFeesScheduleGrid from "./extraFeesScheduleGrid";
import { Link } from "react-router-dom";
import SubTabNavigator from "../../../components/subTabNavigator";
import LinkBtn from "../../../components/linkBtn";

export const ExtraFeesSchedule = () => {
  return (
    <div>
      <SubTabNavigator
        data={[
          { lable: "Extra Fee Schedules", url: "/pricelist/extrafeesschedule" },
          { lable: "Extra Fee", url: "/pricelist/extrafees" },
        ]}
      />
      <div className="ml-4">
        <LinkBtn
          label="New Schedule"
          url={"/pricelist/extrafeesschedule/create"}
        />
      </div>
      <ExtraFeesScheduleGrid />
    </div>
  );
};
