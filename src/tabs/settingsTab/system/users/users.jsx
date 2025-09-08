import React, { useState } from "react";
import LinkBtn from "../../../../components/linkBtn";
import SubTabNavigator from "../../../../components/subTabNavigator";
import UserGrid from "./usersGrid";
import { Checkbox, FormControlLabel } from "@mui/material";

export const Users = () => {
  const [showAchive, setShowArchive] = useState(false);
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Users", url: "/settings/system/users" },
          { lable: "Address", url: "/settings/system/address" },
          // { lable: "Report", url: "/settings/system/report" },
          // { lable: "Anonymize", url: "/settings/system/Anonymize" },
          // { lable: "Audit", url: "/settings/system/audit" },
        ]}
      />
      <div>
        <LinkBtn label="New User" url={"/settings/system/users/create"} />
      </div>

      <div>
        <FormControlLabel
          control={
            <Checkbox
              id="showArchive"
              name="showArchive"
              checked={showAchive}
              onChange={(event) => setShowArchive(event.target.checked)}
            />
          }
          label={<span className="text-sm font-normal">Show Archive Users</span>}
        />
      </div>
      <UserGrid showAchive={showAchive} />
    </div>
  );
};
