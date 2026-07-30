import mongoose, { Schema, Document, model, models } from "mongoose";

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
});

export default models.Personality || model<IPersonality>("Personality", PersonalitySchema);
