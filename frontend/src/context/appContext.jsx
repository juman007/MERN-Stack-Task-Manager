import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
   const backendURL = import.meta.env.VITE_BACKEND_URL;
   const [token, setToken] = useState(localStorage.getItem("token") || "");
   const [cardData, setCardData] = useState([]);

   // Fetch tasks when the token is available
   const fetchTasks = async () => {
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
   };

   return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
   );
};

export default AppContextProvider;
