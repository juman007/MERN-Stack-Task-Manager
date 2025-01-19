import React, { useContext, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {
   Box,
   Button,
   Typography,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
} from "@mui/material";
import CustomCardList from "../components/Card";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/appContext";

const Home = () => {
   const { backendURL, fetchTasks } = useContext(AppContext);
   const [open, setOpen] = useState(false);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");

   // Function to open the dialog
   const handleClickOpen = () => {
      setOpen(true);
   };

   // Function to close the dialog
   const handleClose = () => {
      setOpen(false);
   };

   const handleSubmit = async () => {
      if (title.trim() === "") {
         toast.warning("Title is required");
         return;
      }

      if (description.trim() === "") {
         toast.warning("Description is required");
         return;
      }

      try {
         const token = localStorage.getItem("token");

         if (!token) {
            toast.error("Authentication required");
            return;
         }

         // Send POST request with correct token header
         const response = await axios.post(
            backendURL + "/api/user/addTask",
            { title, description },
            {
               headers: {
                  token: token,
               },
            }
         );

         if (response.data.success) {
            toast.success("Task added successfully");
            fetchTasks(), handleClose();
            setTitle("");
            setDescription("");
         } else {
            toast.error(response.data.message || "Failed to add task");
         }
      } catch (error) {
         console.error("Error posting task:", error);
         toast.error("Error adding task, please try again");
      }
   };

   return (
      <div>
         <ResponsiveAppBar />
         <Box
            sx={{
               width: "87%",
               margin: "0 auto",
               backgroundColor: "#eeeeee",
               padding: 2,
               marginTop: 2,
               borderRadius: 1,
            }}
         >
            {/* Welcome text on the left and Task button on the right */}
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
               }}
            >
               {/* Welcome Text */}
               <Typography
                  variant="h5"
                  sx={{
                     fontWeight: "bold",
                     color: "#333",
                  }}
               >
                  Welcome to Your Dashboard
               </Typography>

               {/* Task Button */}
               <Button
                  variant="contained"
                  color="primary"
                  sx={{
                     backgroundColor: "#007BFF",
                     "&:hover": {
                        backgroundColor: "#0056b3",
                     },
                  }}
                  onClick={handleClickOpen} // Opens the dialog
               >
                  Add Task
               </Button>
            </Box>

            {/* CustomCard Component */}
            <CustomCardList />
         </Box>

         {/* Dialog for Add Task Form */}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
               {/* Title Field */}
               <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{ marginBottom: 2 }}
               />

               {/* Description Field */}
               <TextField
                  margin="dense"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ marginBottom: 2 }}
               />
            </DialogContent>
            <DialogActions>
               {/* Cancel Button */}
               <Button onClick={handleClose} color="primary">
                  Cancel
               </Button>

               {/* Submit Button */}
               <Button onClick={handleSubmit} color="primary">
                  Add Task
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default Home;
