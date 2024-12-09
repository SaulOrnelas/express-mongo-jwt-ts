import { response } from "express";
import { Request, Response } from 'express';
import { insertUsers } from "./rolesAndUsers.js";
import { insertDishes } from "./categoriesAndDishes.js";

export const executeSeeder = (async (req: Request, res: Response = response) => {
  try {
    let userResponse = await insertUsers();
    let dishesResponse = await insertDishes();
    if (!userResponse.seederCompleted) {
      res.json({
        seederCompleted: false,
        message: "Users seeders cannot be completed"
      }).status(500);
    } else if (!dishesResponse.seederCompleted) {
      res.json({
        seederCompleted: false,
        message: "Dishes seeders cannot be completed"
      }).status(500);
    } else if (userResponse.seederCompleted && dishesResponse.seederCompleted) {
      res.json({
        seederCompleted: true,
        message: "All seeders were completed"
      }).status(200);
    }
  } catch (error) {
    res.json({
      error
    }).status(500);
  }
})
