import { Request, Response, NextFunction } from 'express';
import { response } from "express";

export const isAdminRole = (req: Request, res:Response = response, next:NextFunction) => {
  const user = req.user

  if (!user) {
    res.status(500).json({
      msg: "It's necessary validate token before",
    })
  } else if (user.role !== 'ADMIN') {
    res.status(401).json({
      msg: `${user.name} doesn't have privileges`,
    })
  }

  next()
}

export const hasRole = (...roles: string[]) => {
  return (req:Request, res:Response = response, next:NextFunction) => {
    if (!req.user) {
      res.status(500).json({
        msg: "It's necessary validate token before",
      })
    } else if (!roles.includes(req.user?.role)) {
      res.status(401).json({
        msg: `Service requires one of these roles ${roles}`,
      })
    }

    next()
  }
}