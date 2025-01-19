import moment from "moment";

// Function to format a date
export const formatDate = (dateString) => {
   return moment(dateString).format("MM/DD/YYYY"); // Format the date as MM/DD/YYYY
};

// Function to format time
export const formatTime = (dateString) => {
   return moment(dateString).format("hh:mm:ss A"); // Format the time as hh:mm:ss AM/PM
};
