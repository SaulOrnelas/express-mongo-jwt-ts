import { response, request } from "express";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/index.js'

export const validateJWT = async (req:Request = request, res:Response = response, next:NextFunction) => {
  const token = req.header('x-token')

  if (!token) {
    res.status(401).json({
      msg: 'token is required',
    });
    return;
  }

  try {
    const tokenData: any = jwt.verify(token!, process.env.SECRET_PRIVATE_KEY!)

    // Search user by id
    const user = await User.findById(tokenData._id)

    if (!user) {
      res.status(401).json({
        msg: "Invalid token - user doesn't DB",
      })
      return;
    }
    // Check uid
    else if (!user.state) {
      res.status(401).json({
        msg: 'Invalid token - user deleted',
      })
      return;
    } else {
      req.user = user;
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({
      msg: 'Invalid User',
    });
    return;
  }
}
