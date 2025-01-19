import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectiveRoute";

const App = () => {
   return (
      <>
         <ToastContainer position="top-center" />
         <Routes>
            {/* Use ProtectedRoute to wrap the Home Route */}
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
         </Routes>
      </>
   );
};

export default App;
