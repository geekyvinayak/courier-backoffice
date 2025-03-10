import React from "react";
import { Link } from "react-router-dom";
import ExtraFeesCreate from "./extraFeesCreate";
import ExtraFeesGrid from "./extrsFeesGrid";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";
export const ExtraFees = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Extra Fee Schedules", url: "/pricelist/extrafeesschedule" },
          { lable: "Extra Fee Types", url: "/pricelist/extrafees" },
        ]}
      />
      <div>
        <LinkBtn
          label="Add Extra Fees Type"
          url={"/pricelist/extrafees/create"}
        />
      </div>
      <ExtraFeesGrid />
    </div>
  );
};
