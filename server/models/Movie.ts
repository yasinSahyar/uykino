import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  title: string; // فىلىم ئسمى
  image: string;
  isVip: boolean;
  views: number;
  category: "new" | "popular" | "series" | "cartoon" | "program";
  genres: string[];
  year?: number; // فىلىم يىلى
  country?: string; // فىلىم رايۇنى
  language?: string; // فىلىم تىلى
  dateAdded?: string; // يوللانغان ۋاقتى
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    image: {
      type: String,
      required: true,
    },
    isVip: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    category: {
      type: String,
      enum: ["new", "popular", "series", "cartoon", "program"],
      required: true,
    },
    genres: {
      type: [String],
      default: [],
    },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 5,
    },
    country: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      default: "ئۇيغۇرچە",
    },
    dateAdded: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
MovieSchema.index({ title: "text", description: "text" });
MovieSchema.index({ category: 1 });
MovieSchema.index({ year: 1 });
MovieSchema.index({ country: 1 });
MovieSchema.index({ createdAt: -1 });

export const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
