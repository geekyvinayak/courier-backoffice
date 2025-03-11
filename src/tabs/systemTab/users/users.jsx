import React from "react";
import LinkBtn from "../../../components/linkBtn";
import SubTabNavigator from "../../../components/subTabNavigator";
import UserGrid from "./usersGrid";

export const Users = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Users", url: "/settings/system/users" },
          { lable: "Address", url: "/settings/system/address" },
          { lable: "Report", url: "/settings/system/report" },
          { lable: "Anonymize", url: "/settings/system/Anonymize" },
          { lable: "Audit", url: "/settings/system/audit" },
        ]}
      />
      <div>
        <LinkBtn
          label="New User"
          url={"/settings/system/users/create"}
        />
      </div>
      <UserGrid />
    </div>
  );
};
