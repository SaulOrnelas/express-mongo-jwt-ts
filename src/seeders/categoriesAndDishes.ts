import { faker } from "@faker-js/faker";
import { Category, Dish, User } from "../models/index.js";
import { UserInterfaceDoc } from "../interfaces/user.interface.js"
import { CategoryInterface } from "../interfaces/category.interface.js";
import { DishInterface } from "../interfaces/dish.interface.js";

const getAdminsUsers = (async () => {
  let adminUsers: UserInterfaceDoc[] = await User.find({role: "ADMIN"}).exec();
  return adminUsers;
});

const generateCategories = (async () => {
  const users: UserInterfaceDoc[] = await getAdminsUsers();
  let categories: CategoryInterface[] = [];

  users.forEach(user => {
    for(let i = 0; i < 3; i++) {
      let _id = faker.database.mongodbObjectId();
      let name = faker.food.adjective();
      let userId = user._id;
      categories.push({_id, name, user: userId});
    }
  });

  // Remove duplicated elements
  const uniqueCategories = categories.filter((item: CategoryInterface, index: number, self: CategoryInterface[]) => 
    index === self.findIndex((obj: CategoryInterface) => obj.name === item.name)
  )

  return uniqueCategories;
});

export const insertDishes = (async () => {
  let categories: CategoryInterface[] = await generateCategories();
  let dishes: DishInterface[] = [];

  categories.forEach((category: any) => {
    for(let i = 0; i < 6; i++) {
      let name = faker.food.dish();
      let description = faker.food.description();
      let price = faker.number.int({min: 50, max: 500});
      let dish: DishInterface = {
        name: name,
        price: price,
        description: description,
        user: category.user,
        category: category._id
      }
      dishes.push(dish);
    }
  });

  // Remove duplicated elements
  const uniqueDishes = dishes.filter((item: DishInterface, index: number, self: DishInterface[]) => 
    index === self.findIndex((obj: DishInterface) => obj.name === item.name)
  )

  try {
    await Category.deleteMany({});
    await Dish.deleteMany({});

    await Category.insertMany(categories);
    await Dish.insertMany(uniqueDishes);
    console.log("Dishes seeder completed")

    return {seederCompleted: true, message: "Categories and Dishes saved"};
  } catch (error) {
    return {seederCompleted: false, message: "Error to execute seeder"};
  }

})