import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ISiteConfig extends Document {
  key: string;
  headline: string;
  subheadline: string;
  aboutText: string[];
}

const SiteConfigSchema = new Schema<ISiteConfig>({
  key: { type: String, default: "main", unique: true },
  headline: { type: String, default: "Proud of Pakistan – A Symbol of National Honor, Excellence, and Inspiration" },
  subheadline: { type: String, default: "Honoring exceptional citizens whose achievements, character, and service represent the strength and future of our nation." },
  aboutText: { 
    type: [String], 
    default: [
      "\"Proud of Pakistan\" is not merely a title or an award; it is a prestigious recognition dedicated to individuals whose character, commitment, achievements, and selfless service have brought honor and pride to Pakistan. It is a tribute to those who have made a meaningful impact on society through their talent, integrity, hard work, and unwavering dedication.",
      "A true Proud of Pakistan is not defined by fame alone, but by the positive difference they create in the lives of others. These are individuals who place the interests of their nation above personal gain, inspire future generations, and contribute to the progress and prosperity of Pakistan through their actions.",
      "The title \"Proud of Pakistan\" is reserved for exceptional individuals who have demonstrated excellence in diverse fields, including education, healthcare, science, technology, sports, literature, journalism, arts and culture, social welfare, entrepreneurship, public service, law, research, environmental protection, humanitarian work, and national defense.",
      "This recognition also honors young achievers, women, men, and senior citizens who, despite limited resources and countless challenges, have pursued their dreams with determination, perseverance, and integrity.",
      "The purpose of Proud of Pakistan is not only to celebrate extraordinary accomplishments but also to inspire future generations. It seeks to encourage young people to believe that with honesty, discipline, hard work, and commitment, every citizen has the potential to become a source of pride for the nation."
    ] 
  }
});

export default models.SiteConfig || model<ISiteConfig>("SiteConfig", SiteConfigSchema);
