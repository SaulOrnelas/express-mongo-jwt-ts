import { Document } from "mongoose";

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  img?: string;
  role: string;
  state?: boolean;
}

export interface UserInterfaceDoc extends Document {
  //id?: string;
  name: string;
  email: string;
  password?: string;
  img?: string;
  role: string;
  state: boolean;
}