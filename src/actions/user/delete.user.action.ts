import { userModel } from "../../models/user.model";
import { UserType } from "../../models/user.model";

export async function deleteUserById(userId: string) {
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { enabled: false },
    { new: true }
  );
  return updatedUser;
}
