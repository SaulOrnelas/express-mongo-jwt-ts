import { Document } from "mongoose";
import { UserInterfaceDoc } from "./user.interface.js";
import { CategoryInterfaceDoc } from "./category.interface.js";

export interface DishInterface {
  _id?: string;
  name: string;
  state?: boolean;
  user: string;
  price: number;
  category: string;
  description: string;
  img?: string;
}

export interface DishInterfaceDoc extends Document {
  name: string;
  state: boolean;
  user: UserInterfaceDoc | string;
  price: number;
  category: CategoryInterfaceDoc | string;
  description: string;
  img?: string;
}