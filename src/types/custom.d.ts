import { Request } from 'express';
import { ObjectId } from 'mongoose';

// Extiende la interfaz Request para agregar la propiedad 'user'
declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: ObjectId;
        name: string;
        email: string;
        password: string;
        img: string;
        role: string;
        state: boolean;
      };
    }
  }
}