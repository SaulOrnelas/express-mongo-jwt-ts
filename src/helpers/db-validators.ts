import { Category, Dish, Role, User} from '../models/index.js'
import { RoleInterfaceDoc } from '../interfaces/role.interface.js'
import { UserInterfaceDoc } from '../interfaces/user.interface.js'
import { DishInterfaceDoc } from '../interfaces/dish.interface.js'
import { CategoryInterfaceDoc } from '../interfaces/category.interface.js'

export const isValidRole = async (role = '') => {
  const roleExists: RoleInterfaceDoc | null = await Role.findOne({ role })
  if (!roleExists) {
    throw new Error(`Role ${role} isn't in database`)
  }
}

export const existsEmail = async (email = '') => {
  // Check if email exists
  const user: UserInterfaceDoc | null = await User.findOne({ email: new RegExp(`${email}$`, 'i') })
  if (user) {
    throw new Error(`The email ${email}, is currently registered`);
  }
}

export const userExistsById = async (id: string) => {
  // Check if user exists
  const userExists: UserInterfaceDoc | null = await User.findById(id)
  if (!userExists) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

export const categoryExistsById = async (id: string) => {
  // check if category exists
  const category: CategoryInterfaceDoc | null = await Category.findById(id)
  if (!category) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

export const dishExistsById = async (id: string) => {
  // Check if dish exists
  const dish: DishInterfaceDoc | null = await Dish.findById(id)
  if (!dish) {
    throw new Error(`Id ${id} doesn't exists`)
  }
}

/**
 * Validate allowed collections
 */
export const allowedCollections = (collection: string = '', collections: string[] = []) => {
  const collectionExists = collections.includes(collection)
  if (!collectionExists) {
    throw new Error(`Collection ${collection} isn't allowed, ${collections}`)
  }
  return true
}