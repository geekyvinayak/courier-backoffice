import React from "react";
import { Link } from "react-router-dom";
import ExtraFeesCreate from "./extraFeesCreate";
import ExtraFeesGrid from "./extrsFeesGrid";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";
export const ExtraFees = () => {
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
          label="Add Extra Fees Type"
          url={"/pricelist/extrafees/create"}
        />
      </div>
      <ExtraFeesGrid />
    </div>
  );
};
