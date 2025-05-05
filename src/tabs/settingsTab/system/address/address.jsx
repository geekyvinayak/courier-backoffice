import React, { useState } from "react";
import SubTabNavigator from "../../../../components/subTabNavigator";
import AddresGrid from "./addresGrid";
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from "react-router-dom";

export const Address = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    console.log('Selected:', option);
    setAnchorEl(null);
  };

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
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        New Address
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}  PaperProps={{
    style: {
      width: 150,
    },
  }}>
         <Link to={'create/NewContact'}><MenuItem onClick={() => handleClose('Contact')}>Contact</MenuItem></Link>
         <Link to={'create/NewHub'}><MenuItem onClick={() => handleClose('Hub')}>Hub</MenuItem></Link>
         <Link to={'create/NewGlobalAddress'}><MenuItem onClick={() => handleClose('Global')}>Global</MenuItem></Link>
      </Menu>
    </div>
     <AddresGrid />
    </div>
  );
};
