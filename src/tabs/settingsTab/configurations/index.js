import React, { useEffect, useState } from "react";
import SubTabNavigator from "../../../components/subTabNavigator";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import OrderTab from "./orders";
import DriverTab from "./driver";
import AccountTab from "./account";

const ConfigrationsTab = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const location = useLocation();

  const menuConfigs = {
    order: ["Hold Reasons", "Parcel Types", "Parcel Types Schedules", "Status Color", "Rules"],
    driver: ["Deductions/ Additions", "Settlement Cycle", "Documents", "Certifications"],
    account: ["Billing Cycle", "Tax Schedules", "Tax Rules"],
    // accounting: ["Accounting Profiles", "Accounting Items", "Terms", "Document Types"],
    // system: ["Attributes", "Dashboard", "Calendars", "Roles"],
  };

  const getMenuItems = (route) => {
    if (route.startsWith("/settings/configurations/driver")) {
      return menuConfigs.driver;
    }
    if (route.startsWith("/settings/configurations/account")) {
      return menuConfigs.account;
    }
    if (route.startsWith("/settings/configurations/accounting")) {
      return menuConfigs.accounting;
    }
    if (route.startsWith("/settings/configurations/system")) {
      return menuConfigs.system;
    }
    return menuConfigs.order;
  };

  const getCurrentConfigType = (route) => {
    if (route.startsWith("/settings/configurations/driver")) {
      return "driver";
    }
    if (route.startsWith("/settings/configurations/account")) {
      return "account";
    }
    if (route.startsWith("/settings/configurations/accounting")) {
      return "accounting";
    }
    if (route.startsWith("/settings/configurations/system")) {
      return "system";
    }
    return "order";
  };

  const menuItems = getMenuItems(location.pathname);
  const currentConfigType = getCurrentConfigType(location.pathname);

  useEffect(() => {
    setSelectedIndex(0);
  }, [location.pathname]);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  const GenericContent = ({ title, description }) => (
    <Card
      sx={{
        minHeight: 200,
        maxWidth: "75%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center  ",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title} - section will go here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {/* Add specific content for each configuration type */}
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    const selectedItem = menuItems[selectedIndex];
    console.log("first", selectedItem,currentConfigType);
    // Order tab specific content components
    if (currentConfigType === "order") {
      return <OrderTab selectedItem={selectedItem} />;
    }
    if (currentConfigType === "driver") {
      return <DriverTab selectedItem={selectedItem} />;
    }
    if (currentConfigType === "account") {
      return <AccountTab selectedItem={selectedItem} />;
    }

    return <GenericContent title={selectedItem} />;
  };

  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Order", url: "/settings/configurations/order" },
          { lable: "Driver", url: "/settings/configurations/driver" },
          { lable: "Account", url: "/settings/configurations/account" },
          // { lable: "Accounting", url: "/settings/configurations/accounting" },
          // { lable: "System", url: "/settings/configurations/system" },
        ]}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        {/* Left Sidebar Menu */}
        <Paper
          elevation={0}
          sx={{
            width: 250,
            border: "1px solid #ddd",
            height: "fit-content",
          }}
        >
          <List component="nav" disablePadding>
            {menuItems.map((item, index) => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={() => handleItemClick(index)}
                  sx={{
                    py: 1,
                    px: 2,
                    "&.Mui-selected": {
                      backgroundColor: "transparent",
                      borderLeft: "4px solid #1565c0",
                      "& .MuiListItemText-primary": {
                        fontWeight: 500,
                      },
                    },
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      color: selectedIndex === index ? "#1565c0" : "#666",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Right Content Area */}
        <Box sx={{ flex: 1 }}>{renderContent()}</Box>
      </Box>
    </div>
  );
};

export default ConfigrationsTab;
