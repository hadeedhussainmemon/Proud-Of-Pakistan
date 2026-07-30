import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICoreValue {
  name: string;
  description: string;
}

export interface ISiteConfig extends Document {
  key: string;
  headline: string;
  subheadline: string;
  logoUrl: string;
  faviconUrl: string;
  heroImageUrl: string;
  aboutIntro: string;
  vision: string;
  mission: string;
  coreValues: ICoreValue[];
  objectives: string;
  selectionCriteria: string;
  categories: string;
  whyUs: string;
  founderMessage: string;
  impact: string;
  joinUs: string;
}

const SiteConfigSchema = new Schema<ISiteConfig>({
  key: { type: String, default: "main", unique: true },
  headline: { type: String, default: "Proud of Pakistan – A Symbol of National Honor, Excellence, and Inspiration" },
  subheadline: { type: String, default: "Honoring exceptional citizens whose achievements, character, and service represent the strength and future of our nation." },
  logoUrl: { type: String, default: "/logo.jpg" },
  faviconUrl: { type: String, default: "/favicon.ico" },
  heroImageUrl: { type: String, default: "/hero_visual.jpg" },
  
  aboutIntro: { type: String, default: "Proud of Pakistan is a prestigious national recognition platform established to honor extraordinary individuals whose achievements, leadership, innovation, integrity, and selfless service have made a meaningful contribution to Pakistan and its people." },
  vision: { type: String, default: "Our vision is to establish Proud of Pakistan as the country's most respected and trusted national recognition platform, where excellence is celebrated, integrity is rewarded, and service to humanity is honored." },
  mission: { type: String, default: "Our mission is to identify, recognize, honor, and promote individuals whose exceptional achievements have brought pride and dignity to Pakistan." },
  
  coreValues: [
    {
      name: { type: String },
      description: { type: String }
    }
  ],
  
  objectives: { type: String, default: "Our objectives are to discover hidden talent, recognize outstanding individuals, and inspire excellence throughout Pakistan." },
  selectionCriteria: { type: String, default: "Every recipient of Proud of Pakistan is selected through a fair, transparent, and merit-based evaluation process." },
  categories: { type: String, default: "Proud of Pakistan proudly recognizes excellence across diverse sectors, including Education, Healthcare, Science & Technology, Sports, and public service." },
  whyUs: { type: String, default: "Every successful nation celebrates its heroes. Pride of Pakistan exists because countless extraordinary individuals serve the nation with dedication but often remain unrecognized." },
  founderMessage: { type: String, default: "Welcome to Proud of Pakistan. This platform was created with one simple but powerful belief: every individual who serves Pakistan with honesty, excellence, and dedication deserves recognition." },
  impact: { type: String, default: "Proud of Pakistan is committed to creating lasting national impact by recognizing excellence, inspiring youth, and promoting positive social change." },
  joinUs: { type: String, default: "Building a stronger Pakistan is a shared responsibility." }
});

export default models.SiteConfig || model<ISiteConfig>("SiteConfig", SiteConfigSchema);
