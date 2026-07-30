import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IEvent extends Document {
  title: string;
  date: Date;
  description?: string;
  location?: string;
  status: "upcoming" | "past";
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  location: { type: String },
  status: { type: String, enum: ["upcoming", "past"], required: true },
});

EventSchema.index({ title: "text", description: "text", location: "text" });

export default models.Event || model<IEvent>("Event", EventSchema);
