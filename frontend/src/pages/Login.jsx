import React, { useContext, useEffect, useState } from "react";
import {
   TextField,
   Button,
   Container,
   Typography,
   Grid,
   Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; 
import { AppContext } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const { token, backendURL, setToken } = useContext(AppContext);
   const navigate = useNavigate(); 

   useEffect(() => {
      // If token exists, redirect to the home page
      const savedToken = localStorage.getItem("token");
      if (token || savedToken) {
         navigate("/"); 
      }
   }, [token, navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await axios.post(backendURL + "/api/user/login", {
         email: formData.email, 
         password: formData.password,
      });

      if (response.data.success) {
         setToken(response.data.token);
         localStorage.setItem("token", response.data.token);
         navigate("/"); 
      } else {
         toast.error(response.data.message);
      }
   };

   return (
      <Container maxWidth="xs" sx={{ marginTop: "100px" }}>
         <Typography variant="h4" gutterBottom align="center">
            Login
         </Typography>
         <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Email"
                     variant="outlined"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Password"
                     variant="outlined"
                     type="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     required
                  />
               </Grid>
               <Grid item xs={12}>
                  <Button
                     fullWidth
                     type="submit"
                     variant="contained"
                     color="primary"
                  >
                     Login
                  </Button>
               </Grid>
            </Grid>
         </Box>
         <Typography variant="body2" align="center" sx={{ marginTop: "15px" }}>
            Don't have an account?{" "}
            <Link
               to="/signup"
               style={{ textDecoration: "none", color: "#1976d2" }}
            >
               Sign Up
            </Link>
         </Typography>
      </Container>
   );
};

export default Login;
