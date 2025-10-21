import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },  
  },
  { minimize: false }  // when minimize: false then Mongoose will keep empty objects exactly as they are.
);

const userModel= mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;

