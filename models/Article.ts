import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ISEO {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
}

export interface IArticle extends Document {
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  tags: string[];
  content: string;
  authorId: mongoose.Types.ObjectId;
  publishedAt: Date;
  lastUpdated: Date;
  readTime: string;
  heroImage?: string;
  featured: boolean;
  relatedPersonalities: mongoose.Types.ObjectId[];
  relatedBusinesses: mongoose.Types.ObjectId[];
  // Ecosystem fields
  province?: string;
  district?: string;
  city?: string;
  touristPlace?: string;
  historicalEvent?: string;
  // Multimedia
  imageGallery: string[];
  embeddedVideos: string[];
  faqs: IFAQ[];
  // Interaction counts
  likesCount: number;
  bookmarksCount: number;
  // SEO
  seo?: ISEO;
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  subtitle: { type: String },
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  publishedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
  readTime: { type: String, default: "5 min" },
  heroImage: { type: String },
  featured: { type: Boolean, default: false },
  relatedPersonalities: [{ type: Schema.Types.ObjectId, ref: "Personality" }],
  relatedBusinesses: [{ type: Schema.Types.ObjectId, ref: "Business" }],
  // Ecosystem fields
  province: { type: String, index: true },
  district: { type: String, index: true },
  city: { type: String, index: true },
  touristPlace: { type: String },
  historicalEvent: { type: String },
  // Multimedia
  imageGallery: { type: [String], default: [] },
  embeddedVideos: { type: [String], default: [] },
  faqs: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  // Interaction counts
  likesCount: { type: Number, default: 0 },
  bookmarksCount: { type: Number, default: 0 },
  // SEO
  seo: {
    title: { type: String },
    description: { type: String },
    keywords: { type: [String], default: [] },
    ogImage: { type: String },
  },
});

export default models.Article || model<IArticle>("Article", ArticleSchema);
