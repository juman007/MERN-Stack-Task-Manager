import React, { useContext, useEffect, useState } from "react";
import {
   TextField,
   Button,
   Container,
   Typography,
   Grid,
   Box,
   FormHelperText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";

const SignUp = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
   });

   const navigate = useNavigate();
   const { setToken, backendURL } = useContext(AppContext);
   const [emailError, setEmailError] = useState("");
   const [isFormValid, setIsFormValid] = useState(true);

   const { token } = useContext(AppContext);

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

      if (name === "email") {
         // Validate email on change
         if (!value.includes("@")) {
            setEmailError("Email must contain '@' symbol.");
            setIsFormValid(false);
         } else {
            setEmailError("");
            setIsFormValid(true);
         }
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(backendURL + "/api/user/register", {
            name: formData.name, 
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
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container maxWidth="xs" sx={{ marginTop: "100px" }}>
         <Typography variant="h4" gutterBottom align="center">
            Signup
         </Typography>
         <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Name"
                     variant="outlined"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     fullWidth
                     label="Email"
                     variant="outlined"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     error={Boolean(emailError)}
                  />
                  {emailError && <FormHelperText>{emailError}</FormHelperText>}
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
                  <TextField
                     fullWidth
                     label="Confirm Password"
                     variant="outlined"
                     type="password"
                     name="confirmPassword"
                     value={formData.confirmPassword}
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
                     Sign Up
                  </Button>
               </Grid>
            </Grid>
         </Box>
         <Typography variant="body2" align="center" sx={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <Link
               to="/login"
               style={{ textDecoration: "none", color: "#1976d2" }}
            >
               Login
            </Link>
         </Typography>
      </Container>
   );
};

export default SignUp;
