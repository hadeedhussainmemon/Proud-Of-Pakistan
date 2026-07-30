import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITimelineEvent {
  year: string;
  event: string;
}

export interface ISocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

export interface IPersonality extends Document {
  name: string;
  slug: string;
  category: string;
  biography: string;
  birthDate?: Date;
  deathDate?: Date;
  achievements: string[];
  images: string[];
  featured: boolean;
  coverImage?: string;
  profilePicture?: string;
  awards: string[];
  timeline: ITimelineEvent[];
  company?: string;
  videos: string[];
  socialLinks?: ISocialLinks;
  website?: string;
  relatedProfiles: mongoose.Types.ObjectId[];
  sponsored: boolean;
}

const PersonalitySchema = new Schema<IPersonality>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  biography: { type: String, required: true },
  birthDate: { type: Date },
  deathDate: { type: Date },
  achievements: { type: [String], default: [] },
  images: { type: [String], default: [] },
  featured: { type: Boolean, default: false },
  coverImage: { type: String },
  profilePicture: { type: String },
  awards: { type: [String], default: [] },
  timeline: [
    {
      year: { type: String, required: true },
      event: { type: String, required: true },
    },
  ],
  company: { type: String },
  videos: { type: [String], default: [] },
  socialLinks: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
  },
  website: { type: String },
  relatedProfiles: [{ type: Schema.Types.ObjectId, ref: "Personality" }],
  sponsored: { type: Boolean, default: false },
});

export default models.Personality || model<IPersonality>("Personality", PersonalitySchema);
