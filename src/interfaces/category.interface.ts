import { Document } from "mongoose";
import { UserInterfaceDoc } from "./user.interface.js";

export interface CategoryInterface {
  _id?: string;
  name: string;
  state?: string;
  user: string;
}

export interface CategoryInterfaceDoc extends Document {
  //id?: string;
  name: string;
  state?: string;
  user: UserInterfaceDoc | string;
}