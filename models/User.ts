import mongoose, { Schema, Document, model, models } from "mongoose";

export enum UserRole {
  ADMIN = "Admin",
  EDITOR = "Editor",
  CONTRIBUTOR = "Contributor",
  USER = "User",
}

export interface IUserBookmark {
  targetId: mongoose.Types.ObjectId;
  targetType: "Article" | "Business" | "Personality";
  createdAt: Date;
}

export interface IReadingHistory {
  articleId: mongoose.Types.ObjectId;
  readAt: Date;
}

export interface IUserNotification {
  text: string;
  read: boolean;
  date: Date;
}

export interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  bookmarks: IUserBookmark[];
  readingHistory: IReadingHistory[];
  followedCategories: string[];
  notifications: IUserNotification[];
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
  bookmarks: [
    {
      targetId: { type: Schema.Types.ObjectId, required: true },
      targetType: { type: String, required: true, enum: ["Article", "Business", "Personality"] },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  readingHistory: [
    {
      articleId: { type: Schema.Types.ObjectId, ref: "Article", required: true },
      readAt: { type: Date, default: Date.now },
    },
  ],
  followedCategories: { type: [String], default: [] },
  notifications: [
    {
      text: { type: String, required: true },
      read: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
});

export default models.User || model<IUser>("User", UserSchema);
