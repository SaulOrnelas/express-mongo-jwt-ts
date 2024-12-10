import { Schema, model } from "mongoose";
import { RoleInterfaceDoc } from "../interfaces/role.interface.js";

const RoleSchema = new Schema<RoleInterfaceDoc>({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
})

export default model<RoleInterfaceDoc>('Role', RoleSchema)
