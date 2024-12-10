import { Document } from "mongoose";

export interface RoleInterface {
  _id?: string;
  role: string;
}

export interface RoleInterfaceDoc extends Document {
  role: string;
}