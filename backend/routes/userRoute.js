import express from "express";
import {
   addTask,
   deleteTask,
   getAllTasks,
   loginUser,
   registerUser,
   updateTask,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/addTask", authUser, addTask);
userRouter.get("/getTask", authUser, getAllTasks);
userRouter.put("/updateTask/:id", authUser, updateTask);
userRouter.post("/deleteTask", authUser, deleteTask);

export default userRouter;
