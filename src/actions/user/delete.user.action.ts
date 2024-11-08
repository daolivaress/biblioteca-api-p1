import { userModel } from "../../models/user.model";

export async function deleteUserById(userId: string) {
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { enable: false },
    { new: true }
  );
  return updatedUser;
};
