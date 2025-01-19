import React, { useEffect, useState } from "react";
import usericon from "../assets/profile_pic.png";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

const Navbar = () => {
   const navigate = useNavigate();
   const { setToken } = useContext(AppContext);

   const handleLogout = () => {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
   };

   return (
      <AppBar position="static">
         <Toolbar>
            {/* Left Side: Name */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
               <AddTaskIcon sx={{ mr: 1 }} />
               <Typography variant="h6" fontWeight="bold" component="div">
                  TaskMe
               </Typography>
            </Box>

            {/* Right Side: Greeting, User Icon, and Logout Option */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <IconButton sx={{ p: 0 }}>
                  <Avatar alt="User Icon" src={usericon} />
               </IconButton>
               <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <Button
                     sx={{
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                     }}
                     onClick={handleLogout}
                  >
                     <LogoutIcon sx={{ mr: 1 }} /> Logout
                  </Button>
               </Box>
            </Box>
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
