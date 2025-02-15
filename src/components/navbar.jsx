import React, { useEffect, useState } from "react";
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
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { getRequest, postRequest } from "../consts/apiCalls";
import useToast from "./toast/useToast";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { showSuccess, showError, showWarning } = useToast();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const[userData,setUserData] = useState(null)

  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.history.replaceState(null, "", "/login");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const fetchUserData= async ()=>{
    const response = await getRequest('/users/profile')
    setUserData(response)
    console.log("resp",response)
  }

  useEffect(() => {
    if(userData == null){
    fetchUserData();
    }
  });

  return (
    <div className="flex justify-between p-1 items-center border-b-2">
      <TabNavigation />
      <div className="flex gap-2 justify-between items-center">
        <div className={`flex-shrink bg-[${colors.primary[400]}] border-2 h-[50%]`}>
          <InputBase sx={{ ml: 2 }} placeholder="Order Id" />
          <IconButton
            type="button"
            sx={{ backgroundColor: colors.blueAccent[500], borderRadius: 0, height:"100%" }}
          >
            <ArrowForwardOutlined sx={{ fontSize: 20 }}/>
          </IconButton>
        </div>
        
        <div className="relative profile-menu-container">
          <IconButton 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            sx={{
              backgroundColor: showProfileMenu ? colors.blueAccent[500] : 'transparent',
              '&:hover': {
                backgroundColor: showProfileMenu ? colors.blueAccent[600] : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <PermIdentityOutlinedIcon 
              sx={{ 
                fontSize: 28,
                color: showProfileMenu ? 'white' : 'inherit'
              }}
            />
          </IconButton>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b">
                <div className="flex items-center gap-2">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
                    {userData?<span className="text-gray-600 uppercase">{userData?.firstName[0]+userData?.lastName[0]}</span>:<span className="inline-block animate-pulse bg-slate-200 rounded w-6 h-4"></span>}
                  </div>
                  <div>
                    {userData?<div className="text-sm font-medium capitalize">{userData?.firstName + " " +userData?.lastName}</div>:<span className="inline-block animate-pulse bg-slate-200 rounded h-4 min-w-full"></span>}
                    {userData?<div className="text-xs text-gray-500">{userData?.email}</div>:<span className="inline-block animate-pulse bg-slate-200 rounded min-w-24 h-4 "></span>}
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-2">
                <div className="text-sm text-gray-700">Contact Language</div>
                <div className="text-sm text-gray-500">English</div>
              </div>
              
              <div className="px-4 py-2 border-b">
                <div className="text-sm text-gray-700">Time Zone</div>
                <div className="text-sm text-gray-500">Eastern Standard Time</div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogoutOutlinedIcon sx={{ fontSize: 20,borderRadius:"0" }} />
                Log off
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;