import mongoose, { Schema, models } from "mongoose";

const JournalSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Journal =
  models.Journal || mongoose.model("Journal", JournalSchema);
