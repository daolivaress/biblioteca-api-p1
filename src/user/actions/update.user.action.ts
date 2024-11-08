import { UserType } from "../user.model";
import { userModel } from "../user.model";

export async function updateUserById(userId:string, data:Partial<UserType>){
  const user = await userModel.findById(userId);
  
  if (!user) {
      return null;
  }
  user.name = data.name || user.name;
  user.email = data.email || user.email;
  user.password = data.password || user.password; 

  await user.save();
  return user;
};