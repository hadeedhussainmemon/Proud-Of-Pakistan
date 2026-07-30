import mongoose, { Schema, Document, model, models } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  EDITOR = "Editor",
  CONTRIBUTOR = "Contributor",
  USER = "User",
}

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String },
  image: { type: String },
  role: { 
    type: String, 
    enum: Object.values(UserRole), 
    default: UserRole.USER 
  },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model<IUser>("User", UserSchema);
