import { response, request } from "express";
import { Request, Response } from 'express';
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { User } from "../models/index.js";
import { UserInterface, UserInterfaceDoc } from "../interfaces/user.interface.js";

export const fetchUsers = async (req: Request = request, res: Response = response) => {
  const { limit = 5, from = 0 } = req.query
  const query = { state: true }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ])

  res.json({
    total,
    users,
  })
}

export const createUser = async (req: Request, res: Response = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })

  // Encrypt password
  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password, salt)

  await user.save()

  res.json({
    user,
  })
}

export const updateUser = async (req: Request, res: Response = response) => {
  const { id } = req.params
  const { _id, password, email, ...remainingData } = req.body

  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync()
    remainingData.password = bcryptjs.hashSync(password, salt)
  }

  const user: UserInterfaceDoc | null = await User.findByIdAndUpdate(id, remainingData)

  res.json(user)
}

export const deleteUser = async (req: Request, res: Response = response) => {
  const result = validationResult(req);
  if (result.isEmpty()){
    const { id } = req.params
    const user: UserInterfaceDoc | null = await User.findByIdAndUpdate(id, { state: false })
  
    res.json(user)
  } else {
    res.status(400).json({
      errors: result.array()
    });
  }
}
