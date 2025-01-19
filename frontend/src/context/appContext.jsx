import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { Box } from "@mui/material";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [cardData, setCardData] = useState([]);
   const [loading, setLoading] = useState(false);

   // Fetch tasks when the token is available
   const fetchTasks = async () => {
      setLoading(true);
      try {
         const response = await axios.get(backendURL + "/api/user/getTask", {
            headers: {
               token: token,
            },
         });

         if (response.data.success) {
            setCardData(response.data.tasks);
         } else {
            console.error("Error fetching tasks:", response.data.message);
         }
      } catch (error) {
         console.error("Error fetching tasks:", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (token) {
         fetchTasks();
      }
   }, [token, backendURL]);

   const value = {
      token,
      setToken,
      backendURL,
      cardData,
      fetchTasks,
      loading,
      setLoading,
   };

   return (
      <AppContext.Provider value={value}>
         {" "}
         {loading ? (
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
               }}
            >
               <Loader />
            </Box>
         ) : (
            props.children
         )}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
