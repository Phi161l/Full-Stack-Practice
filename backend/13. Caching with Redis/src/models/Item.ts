import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
  name: string;
  price: number;
}

const itemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IItem>("Item", itemSchema);
