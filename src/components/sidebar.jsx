import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
// import {MenuOutlinedIcon } from '@mui/icons-material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
const Sidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setIsSelected] = useState("Dashboard");

  return (
    <div className="h-[100%]">
      <Sidebar
        collapsed={isCollapsed}
        rootStyles={{
          [`.ps-sidebar-container`]: {
            background: `${colors.primary[400]} !important`,
            height:"100% !important",
          },
          ['&.ps-sidebar-root']:{
            height:"100% !important",
          },
          
        }}
      >
        <Menu
        rootStyles={{
            [`.ps-sidebar-container`]: {
              background: `${colors.primary[400]} !important`,
              height:"100% !important",
            },
            ['&.ps-sidebar-root']:{
              height:"100% !important",
            },
            
          }}
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`.active`]: {
                backgroundColor: "#13395e",
                color: "red",
              },
              [`&:hover`]:{
                // backgroundColor:"red"
                color:`black !important`
              }
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
                <Typography variant="h3" >
                  LOGO
                </Typography>
                  <MenuOutlinedIcon />
              </div>
            )}
          </MenuItem>
          
          <MenuItem
            icon={isCollapsed ? <GridViewOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/dashboard" />}
          >
            {!isCollapsed && (
              <div className="flex gap-2 items-center ml-[15px]">
                <GridViewOutlinedIcon /> {!isCollapsed && "Dashboard"}
              </div>
            )}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebarr;
