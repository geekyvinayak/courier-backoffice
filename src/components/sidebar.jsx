import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
// import {MenuOutlinedIcon } from '@mui/icons-material'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import AddLocationOutlinedIcon from '@mui/icons-material/AddLocationOutlined';
const Sidebarr = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
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
            }
          }}
          menuItemStyles={{
            button: {
              [`.active`]: {
                backgroundColor: "#13395e",
                color: "red",
              },
              [`&:hover`]:{
                // backgroundColor:"red"
                color:`black !important`
              },

            ['&.ps-active']:{
              backgroundColor: `${colors.blueAccent[300]} !important`,
              color: `${colors.primary[400]} !important`
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
            active={selected === 'Dashboard'}
            onClick={()=>{setIsSelected('Dashboard')}}
          >
            {!isCollapsed && (
              <div className="flex gap-2 items-center ml-[15px]">
                <GridViewOutlinedIcon /> {!isCollapsed && "Dashboard"}
              </div>
            )}
          </MenuItem>

          <MenuItem
            icon={isCollapsed ? <AddLocationOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
            component={<Link to="/" />}
            active={selected === 'Second'}
            onClick={()=>{setIsSelected('Second')}}
          >
            {!isCollapsed && (
              <div className="flex gap-2 items-center ml-[15px]">
                <AddLocationOutlinedIcon /> {!isCollapsed && "Second"}
              </div>
            )}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Sidebarr;
