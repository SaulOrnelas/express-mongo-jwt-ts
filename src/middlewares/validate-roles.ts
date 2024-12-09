import { Request, Response, NextFunction } from 'express';
import { response } from "express";

export const isAdminRole = (req: Request, res:Response = response, next:NextFunction) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "It's necessary validate token before",
    })
  }

  const { role, name } = req.user

  if (role !== 'ADMIN') {
    return res.status(401).json({
      msg: `${name} doesn't have privileges`,
    })
  }

  next()
}

export const hasRole = (...roles: string[]) => {
  return (req:Request, res:Response = response, next:NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "It's necessary validate token before",
      })
    }

    if (!roles.includes(req.user?.role)) {
      return res.status(401).json({
        msg: `Service requires one of these roles ${roles}`,
      })
    }

    next()
  }
}