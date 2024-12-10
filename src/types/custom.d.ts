import { Request } from 'express';
import { ObjectId } from 'mongoose';
import { Document } from "mongoose";

// Extiende la interfaz Request para agregar la propiedad 'user'
declare global {
  namespace Express {
    interface Request extends Document {
      user?: {
        _id: ObjectId;
        name: string;
        email: string;
        password?: string;
        img?: string;
        role: string;
        state: boolean;
      };
    }
  }
}