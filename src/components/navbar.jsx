import React, { useEffect } from "react";
import { IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import { InputBase } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  PersonOutline,
  ArrowForwardOutlined,
} from "@mui/icons-material";
import TabNavigation from "./tabNavigation";
import size from "lodash/size";
import { postRequest } from "../consts/apiCalls";
import useToast from "./toast/useToast";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { showSuccess, showError, showWarning } = useToast();

  const generateToken = async () => {
    const token = localStorage.getItem("token");

    if (!size(token)) {
      const response = await postRequest("/api/v1/auth/authenticate", {
        email: "dev@front.com",
        password: "Test@123",
      });
      console.log("response", response);
      localStorage.setItem("token", response.token);
      showSuccess("token generated");
    } else {
      showWarning("already exists");
    }
  };

  return (
    <div className="flex justify-between p-2 items-center border-b-2">
      <div>
        <TabNavigation />
      </div>
      <div className="flex">
        <div className={`flex-shrink  bg-[${colors.primary[400]}] border-2`}>
          <InputBase sx={{ ml: 2 }} placeholder="Order Id" />
          <IconButton
            type="button"
            sx={{ backgroundColor: colors.blueAccent[500], borderRadius: 0 }}
            className="bg-red-400"
          >
            <ArrowForwardOutlined color="red" />
          </IconButton>
        </div>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "light" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
        <IconButton onClick={generateToken}>
          <PersonOutline />
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
