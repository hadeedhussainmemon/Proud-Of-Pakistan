import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  image?: string;
}

export interface IBusinessContact {
  phone?: string;
  email?: string;
  address?: string;
}

export interface IBusiness extends Document {
  name: string;
  slug: string;
  category: string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  featured: boolean;
  cover?: string;
  logo?: string;
  services: string[];
  products: string[];
  team: ITeamMember[];
  gallery: string[];
  videos: string[];
  contact?: IBusinessContact;
  premium: boolean;
}

const BusinessSchema = new Schema<IBusiness>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String },
  websiteUrl: { type: String },
  featured: { type: Boolean, default: false },
  cover: { type: String },
  logo: { type: String },
  services: { type: [String], default: [] },
  products: { type: [String], default: [] },
  team: [
    {
      name: { type: String, required: true },
      role: { type: String, required: true },
      image: { type: String },
    },
  ],
  gallery: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  contact: {
    phone: { type: String },
    email: { type: String },
    address: { type: String },
  },
  premium: { type: Boolean, default: false },
});

export default models.Business || model<IBusiness>("Business", BusinessSchema);
