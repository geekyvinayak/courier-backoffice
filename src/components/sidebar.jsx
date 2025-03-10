import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../theme";
// import {MenuOutlinedIcon } from '@mui/icons-material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Sidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const currentPath = location.pathname.split("/")[1];

  return (
    <div className="h-[100%] relative">
      <Sidebar
        collapsed={true}
        rootStyles={{
          [`.ps-sidebar-container`]: {
            background: `${colors.primary[400]} !important`,
            height: "100% !important",
            position: "fixed",
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
              width: "190px !important",
              position: "stick",
            },
            ["&.ps-sidebar-root"]: {
              height: "100% !important",
              width: "190px !important",
              maxWidth: "190px !important",
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
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/loginLogo.png" width={"35px"} />
          </MenuItem>

          <MenuItem
            icon={<SpaceDashboardOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/dashboard" />}
            active={currentPath === "dashboard"}
          ></MenuItem>
          <MenuItem
            icon={<AttachMoneyOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/pricelist" />}
            active={currentPath === "pricelist"}
          ></MenuItem>

          <MenuItem
            icon={<AccountCircleOutlinedIcon />}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/accounts" />}
            active={currentPath === "accounts"}
          ></MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebarr;
