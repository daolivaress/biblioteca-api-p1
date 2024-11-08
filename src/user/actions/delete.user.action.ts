import { userModel } from "../user.model";

export async function deleteUserById(userId: string) {
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { enable: false },
    { new: true }
  );
  return updatedUser;
};
