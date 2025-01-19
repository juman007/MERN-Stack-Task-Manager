import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      tasks: [
         {
            title: {
               type: String,
               required: true,
            },
            description: {
               type: String,
               required: true,
            },
            completed: {
               type: Boolean,
               default: false,
            },
            createdAt: {
               type: Date,
               default: Date.now,
            },
         },
      ],
   },
   { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
