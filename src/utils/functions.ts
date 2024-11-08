import { userModel } from "../models/user.model";

export async function findUserById(userId:string){
  return await userModel.findOne({_id: userId, enabled: true}).select('-password -__v');
};