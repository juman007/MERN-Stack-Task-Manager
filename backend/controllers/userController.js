import userModel from "../models/userSchema.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Initial tasks data
const initialTasks = [
   {
      title: "Getting Started with React",
      description:
         "Learn the basics of React.js, including components, state, and props, to build modern web applications.",
      createdAt: new Date("2025-01-18 10:30 AM"),
   },
   {
      title: "Mastering JavaScript ES6 Features",
      description:
         "Dive into ES6 syntax, arrow functions, template literals, and more to write clean and efficient JavaScript code.",
      createdAt: new Date("2025-01-17 08:45 PM"),
   },
   {
      title: "Understanding Asynchronous Programming",
      description:
         "Explore promises, async/await, and the event loop to handle asynchronous tasks effectively in JavaScript.",
      createdAt: new Date("2025-01-16 03:15 PM"),
   },
];

// API to register to user
export const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
         return res.json({
            success: false,
            message: "Missing Details",
         });
      }

      // vaalidating email format
      if (!validator.isEmail(email)) {
         return res.json({
            success: false,
            message: "Please enter a valid email",
         });
      }

      // Validating strong password
      if (password.length < 8) {
         return res.json({
            success: false,
            message: "Password must be at least 8 characters long",
         });
      }

      // hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userData = {
         name,
         email,
         password: hashedPassword,
         tasks: initialTasks,
      };

      const newUser = new userModel(userData);
      const user = await newUser.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      res.json({
         success: true,
         message: "User registered successfully",
         token,
      });
   } catch (error) {
      console.log(error);

      res.json({
         success: false,
         message: error.message,
      });
   }
};

// API for user Login

export const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });

      if (!user) {
         return res.json({
            success: false,
            message: "User not found",
         });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
         res.json({
            success: true,
            message: "User logged in successfully",
            token,
         });
      } else {
         return res.json({
            success: false,
            message: "Invalid credentials",
         });
      }
   } catch (error) {
      console.log(error);

      res.json({
         success: false,
         message: error.message,
      });
   }
};

// Add task
export const addTask = async (req, res) => {
   try {
      const { title, description, userId } = req.body;

      // Find the user by ID from the decoded token
      const user = await userModel.findById(userId);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      // Create a new task
      const newTask = {
         title,
         description,
         completed: false, // You can set this to `false` by default
      };

      // Add the new task to the user's task array
      user.tasks.unshift(newTask);

      // Save the user with the new task
      await user.save();

      return res.status(201).json({
         success: true,
         message: "Task added successfully",
         task: newTask,
      });
   } catch (error) {
      console.error(error.message);
      return res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

// API to get all tasks
export const getAllTasks = async (req, res) => {
   try {
      const { userId } = req.body;

      // Find the user by ID from the decoded token
      const user = await userModel.findById(userId);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      return res.json({
         success: true,
         message: "Tasks retrieved successfully",
         tasks: user.tasks,
      });
   } catch (error) {
      console.error(error.message);
      return res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

// API to update a specific task by ID
export const updateTask = async (req, res) => {
   try {
      const { userId, title, description } = req.body;
      const taskId = req.params.id;

      // Find the user by ID
      const user = await userModel.findById(userId);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      // Find the task by taskId in the user's tasks array
      const task = user.tasks.id(taskId); // Correct way to find subdocument by ID

      if (!task) {
         return res.status(404).json({
            success: false,
            message: "Task not found",
         });
      }

      // Update the task fields if provided
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;

      // Save the user document
      await user.save();

      return res.json({
         success: true,
         message: "Task updated successfully",
         task,
      });
   } catch (error) {
      console.error(error.message);
      return res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};

// API to delete a task by ID

export const deleteTask = async (req, res) => {
   try {
      const { userId, taskId } = req.body;

      console.log("Received User ID:", userId);
      console.log("Received Task ID:", taskId);

      // Validate userId and taskId
      if (!userId || !taskId) {
         return res.status(400).json({
            success: false,
            message: "User ID and Task ID are required",
         });
      }

      const user = await userModel.findById(userId);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      const taskIndex = user.tasks.findIndex(
         (task) => task._id.toString() === taskId
      );

      if (taskIndex === -1) {
         return res.status(404).json({
            success: false,
            message: "Task not found",
         });
      }

      // Remove the task from the tasks array
      user.tasks.splice(taskIndex, 1);

      await user.save();

      return res.status(200).json({
         success: true,
         message: "Task deleted successfully",
      });
   } catch (error) {
      console.error("Error in deleteTask:", error.message);
      return res.status(500).json({
         success: false,
         message: "Server error",
      });
   }
};
