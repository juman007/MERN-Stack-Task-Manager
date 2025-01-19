import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

const ProtectedRoute = ({ element }) => {
   const { token } = useContext(AppContext);

   // Check if the token exists in state or localStorage
   const savedToken = localStorage.getItem("token");

   // If no token is found, redirect to login page
   if (!token && !savedToken) {
      return <Navigate to="/login" />;
   }

   return element;
};

export default ProtectedRoute;
