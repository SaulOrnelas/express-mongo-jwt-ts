import { Schema, model } from "mongoose";
import { CategoryInterfaceDoc } from "../interfaces/category.interface.js";

const CategorySchema = new Schema<CategoryInterfaceDoc>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, state, ...data } = this.toObject()
  return data
}

export default model<CategoryInterfaceDoc>('Category', CategorySchema);
