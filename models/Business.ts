import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IBusiness extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  featured: boolean;
}

const BusinessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String },
  websiteUrl: { type: String },
  featured: { type: Boolean, default: false },
});

export default models.Business || model<IBusiness>("Business", BusinessSchema);
