# MERN Stack Assignment Submission: Task Management Application

## Objective  
The goal of this assignment was to develop a Task Management Application using the MERN stack, integrating backend APIs with a MongoDB database (via Mongoose) and a React frontend styled with Material UI.

---

### Deployed Application URLs
```bash 
 Frontend: https://taskmefrontend.vercel.app
```
```bash
 Backend: https://taskme-eo9u.onrender.com
```
###  Login Email and Passowrd
```bash
Email: j@juman.com
```
```bash
Password: 12345678
```

---

## Features Implemented  

### **Backend** (Node.js + Express + MongoDB + Mongoose)
1. **RESTful APIs for CRUD Operations**:  
   - **Add Task**: `POST /tasks`  
   - **Retrieve All Tasks**: `GET /tasks`  
   - **Update Task**: `PUT /tasks/:id`  
   - **Delete Task**: `DELETE /tasks/:id`  

2. **Mongoose Schema**:  
   Tasks have the following fields:  
   - **Title** (required)  
   - **Description** (required)  
   - **Timestamp** (auto-generated)

3. **Validation**:  
   - API requests validate that the `title` and `description` are non-empty.

4. **Folder Structure**:  
   - `routes/`: Defines task routes.  
   - `controllers/`: Handles business logic.  
   - `models/`: Contains the Task schema.  

### **Frontend** (React + Material UI)  
1. **Task Management Interface**:  
   - Displays a list of tasks.  
   - Provides buttons to edit or delete tasks.  
   - Includes a modal form to add or edit a task.  

2. **Form Validation**:  
   - Ensures that the title and description fields are not empty before submission.  

3. **Responsive Design**:  
   - Fully responsive using Material UI Grid and components.  

4. **Folder Structure**:  
   - `components/`: Reusable UI components (e.g., TaskList, TaskForm).    
   - `pages/`: Pages like `Home` for task management.

---

## Additional Features Implemented (Bonus Points)  
- **Search Bar**: Filters tasks by title in real-time.    
- **Responsive Design**: Works well on mobile and desktop devices.  
- **User Authentication**: Includes a simple login system with session-based authentication.  
- **State Management**: Utilized Context API to manage task state across components.

---

## Setup Instructions  

### Repository Structure  
1. Clone the repository:  
   ```bash
   git clone https://github.com/juman007/MERN-Stack-Task-Manager
   cd MERN-Stack-Task-Manager
   ```
2. Navigate to the `frontend` or `backend` folder as needed.  

### Backend  
1. Go to the backend folder:  
   ```bash
   cd backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Add `.env` file with the following:  
   ```
   MONGODB_URI = 'mongodb+srv://juman:juman@cluster0.1hber.mongodb.net'
   JWT_SECRET='jumansaikia'

   ```
4. Run the backend server:  
   ```bash
   npm run server
   ```

### Frontend  
1. Go to the frontend folder:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a `.env` file with the following:  
   ```
   VITE_BACKEND_URL = 'https://taskme-eo9u.onrender.com'
   ```
4. Start the development server:  
   ```bash
   npm run dev
   ```

---

## Design Choices and Assumptions  
1. **Material UI**: Used for its rich components and responsive design utilities.  
2. **Context API**: Preferred over Redux for lightweight state management given the app's simplicity.  
3. **Folder Structure**: Organized to ensure scalability and maintainability.

---

## Technology Stack  
1. **Frontend**: React, Material UI  
2. **Backend**: Node.js, Express, Jwt, Validator, bycrpt  
3. **Database**: MongoDB (via Mongoose)  
4. **Deployment**:  
   - **Frontend**: Netlify ([https://taskmefrontend.vercel.app](https://taskmefrontend.vercel.app))  
   - **Backend**: Render ([https://taskme-eo9u.onrender.com](https://taskme-eo9u.onrender.com/))  

---

## Known Issues  
- **Authentication**: A basic login system is implemented but lacks robust security measures like JWT.  
- **Testing**: Automated testing was not implemented due to time constraints.

---

## Future Enhancements  
- Implement JWT-based authentication.  
- Add unit and integration tests.  
- Introduce real-time updates .

---

### GitHub Repository Links  
- [Github Repository](https://github.com/juman007/MERN-Stack-Task-Manager)  
