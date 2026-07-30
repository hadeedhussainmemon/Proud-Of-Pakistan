import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IGalleryItem extends Document {
  title: string;
  category: string;
  imageUrl: string;
}

const GallerySchema = new Schema<IGalleryItem>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default models.Gallery || model<IGalleryItem>("Gallery", GallerySchema);

