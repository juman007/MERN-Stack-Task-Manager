import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   TextField,
   Button,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../context/appContext";
import { formatDate, formatTime } from "./convertDateTime";
import { toast } from "react-toastify";

const CustomCardList = () => {
   const { cardData, backendURL, fetchTasks, setCardData, token } =
      useContext(AppContext);
   console.log(cardData);

   const [openEditDialog, setOpenEditDialog] = useState(false);
   const [currentCard, setCurrentCard] = useState(null);
   const [updatedTitle, setUpdatedTitle] = useState("");
   const [updatedDescription, setUpdatedDescription] = useState("");
   const [cards, setCards] = useState(cardData);

   // Open the edit form dialog and populate the fields
   const handleEditClick = (item) => {
      setCurrentCard(item);
      setUpdatedTitle(item.title);
      setUpdatedDescription(item.description);
      setOpenEditDialog(true);
   };

   // Handle closing the dialog
   const handleCloseDialog = () => {
      setOpenEditDialog(false);
      setUpdatedTitle("");
      setUpdatedDescription("");
   };

   // Handle updating the card data (POST to the backend)
   const handleSaveChanges = async () => {
      if (!updatedTitle || !updatedDescription) {
         alert("Both title and description are required!");
         return;
      }

      try {
         const response = await axios.put(
            `${backendURL}/api/user/updateTask/${currentCard._id}`,
            {
               title: updatedTitle,
               description: updatedDescription,
            },
            {
               headers: {
                  token: token,
               },
            }
         );

         if (response.data.success) {
            setOpenEditDialog(false); // Close the dialog
            toast.success(response.data.message);
            await fetchTasks(); // Refetch updated tasks
         } else {
            console.error("Error updating task:", response.data.message);
         }
      } catch (error) {
         console.error("Error updating task:", error);
      }
   };

   // Handle deleting a card (POST to backend)
   const handleDeleteClick = async (taskId) => {
      try {
         const response = await axios.post(
            `${backendURL}/api/user/deleteTask`,
            {
               // Include userId in the request body
               taskId: taskId, // Include taskId in the request body
            },
            {
               headers: {
                  token: token, // Pass the token for authentication
               },
            }
         );

         if (response.data.success) {
            toast.success(response.data.message);
            await fetchTasks(); // Refresh tasks after successful deletion
         } else {
            console.error("Error deleting task:", response.data.message);
         }
      } catch (error) {
         console.error(
            "Error deleting task:",
            error.response?.data || error.message
         );
      }
   };

   return (
      <div>
         <Grid container spacing={2} sx={{ padding: 2 }}>
            {cardData.map((item) => (
               <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                     sx={{
                        maxWidth: 400,
                        margin: "auto",
                        padding: 2,
                        backgroundColor: "background.paper",
                        boxShadow: 3,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%", // Ensures that the cards are stretched to the same height
                     }}
                  >
                     <CardContent sx={{ flexGrow: 1 }}>
                        {/* Heading */}
                        <Typography
                           variant="h5"
                           component="div"
                           sx={{ fontWeight: "bold", mb: 1 }}
                        >
                           {item.title}
                        </Typography>

                        {/* Description */}
                        <Typography
                           variant="body2"
                           color="text.secondary"
                           sx={{ mb: 2 }}
                        >
                           {item.description}
                        </Typography>
                     </CardContent>

                     {/* Actions: Delete and Update */}
                     <CardActions
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           alignItems: "center",
                        }}
                     >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                           <IconButton
                              aria-label="edit"
                              color="primary"
                              onClick={() => handleEditClick(item)}
                           >
                              <EditIcon />
                           </IconButton>
                           <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={() => handleDeleteClick(item._id)} // Pass the _id of the current item
                           >
                              <DeleteIcon />
                           </IconButton>
                        </Box>

                        {/* Created Date and Time */}
                        <Typography variant="caption" color="text.secondary">
                           {formatDate(item.createdAt)} {" | "}
                           {formatTime(item.createdAt)}
                        </Typography>
                     </CardActions>
                  </Card>
               </Grid>
            ))}
         </Grid>

         {/* Edit Task Dialog */}
         <Dialog open={openEditDialog} onClose={handleCloseDialog}>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
               {/* Title Field */}
               <TextField
                  autoFocus
                  margin="dense"
                  label="Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
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
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  sx={{ marginBottom: 2 }}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseDialog} color="primary">
                  Cancel
               </Button>
               <Button onClick={handleSaveChanges} color="primary">
                  Save Changes
               </Button>
            </DialogActions>
         </Dialog>
      </div>
   );
};

export default CustomCardList;
