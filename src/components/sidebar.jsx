import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
// import {MenuOutlinedIcon } from '@mui/icons-material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
const Sidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  return (
    <div className="h-[100%] relative">
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          [`.ps-sidebar-container`]: {
            background: `${colors.primary[400]} !important`,
            height: "100% !important",
            position:"fixed",
          },
          ["&.ps-sidebar-root"]: {
            height: "100% !important",
          },
        }}
      >
        <Menu
          rootStyles={{
            [`.ps-sidebar-container`]: {
              background: `${colors.primary[400]} !important`,
              height: "100% !important",
              position: "stick",
            },
            ["&.ps-sidebar-root"]: {
              height: "100% !important",
            },
          }}
          menuItemStyles={{
            button: {
              [`.active`]: {
                backgroundColor: "#13395e",
                color: "red",
              },
              [`&:hover`]: {
                // backgroundColor:"red"
                color: `black !important`,
              },

              ["&.ps-active"]: {
                backgroundColor: `${colors.blueAccent[300]} !important`,
                color: `${colors.primary[400]} !important`,
              },
            },
          }}
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <div className="flex justify-between items-center ml-[15px]">
                <Typography variant="h3">LOGO</Typography>
                <MenuOutlinedIcon />
              </div>
            )}
          </MenuItem>

          <MenuItem
            icon={isCollapsed ? <DonutLargeOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/dashboard" />}
            active={currentPath === "dashboard"}
          >
            {!isCollapsed && (
              <div className="flex gap-2 items-center ml-[15px]">
                <DonutLargeOutlinedIcon /> {!isCollapsed && "Dashboard"}
              </div>
            )}
          </MenuItem>

          <MenuItem
            icon={isCollapsed ? <LocalOfferOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/pricelist" />}
            active={currentPath === "pricelist"}
          >
            {!isCollapsed && (
              <div className="flex gap-2 items-center ml-[15px]">
                <LocalOfferOutlinedIcon /> {!isCollapsed && "Price List"}
              </div>
            )}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebarr;
