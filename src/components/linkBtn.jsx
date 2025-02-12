import { Button, Stack, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const LinkBtn = ({ label = "", url = "/", size = "large", filled = true ,customClass="" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  console.log(colors);
  const handleNavigation = (link) => {
    navigate(link);
  };
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <Stack spacing={2} direction="row">
      <Button
        size={size}
        sx={{
          border: "2px solid white", // Red border (you can change the color)
          backgroundColor: "white",
          
          "&.active": {
            backgroundColor: "#1569CB", // Solid red when active
            color: "white",
            border: `2px solid #1569CB`,
          },
          "&.inactive":{
            backgroundColor: "white !important", // Solid red when active
            color: "black !important",
            border: `2px solid white !important`,
          },
          "&:hover": {
            // backgroundColor: colors.blueAccent[500], // Light red on hover
            border: `2px solid #1569CB !important`,
          },
        }}
        className={`px-4 py-2 font-semibold !capitalize rounded shadow focus:outline-none focus:ring ${customClass} ${
          currentPath == url ||filled ? "active" : "inactive"
        }`}
        onClick={() => handleNavigation(url)}
      >
        {label}
      </Button>
    </Stack>
  );
};

export default LinkBtn;
