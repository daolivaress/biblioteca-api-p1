import { userModel } from "../user.model";

export async function findUserById(userId:string){
  return await userModel.findOne({_id: userId, enable: true}).select('-password -__v');
};