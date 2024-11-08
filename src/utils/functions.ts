import { UserType } from "../models/user.model";
import { userModel } from "../models/user.model";

export const checkPermissions = (user:UserType, action: 'create' | 'read' | 'update' | 'delete'): boolean => {
  switch (action) {
    case 'create':
      return user.canCreate;
    case 'read':
      return user.canRead;
    case 'update':
      return user.canUpdate;
    case 'delete':
      return user.canDelete;
    default:
      return false;
  }
};

export async function findUserById(userId:string){
  return await userModel.findOne({_id: userId, enabled: true}).select('-password -__v');
};