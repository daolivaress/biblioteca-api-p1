import { Request, Response } from "express";
import { findUserById } from "../utils/functions";
import { updateUserById } from "../actions/user/update.user.action";
import { deleteUserById } from "../actions/user/delete.user.action";
import { checkPermissions } from "../utils/functions";
import argon2 from "argon2";
import { UserType, userModel } from "../models/user.model";

interface CustomRequest extends Request {
  userId?: string;
}

export async function getUserController(req: CustomRequest, res: Response) {
  try {
    const userId = req.params.id || req.userId;
    const user = await findUserById(userId as string);
    if (!user) {
      res.status(404).json({ message: "User not found or not enabled" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user",
      error: (error as Error).message,
    });
  }
}

export async function updateUserController(req: CustomRequest, res: Response) {
  const { name, email, password } = req.body;
  const userIdToUpdate = req.params.id;

  try {
    const currentUser = (await userModel.findById(req.userId)) as UserType;
    if (!currentUser) {
      res.status(404).json({ message: "Current user not found" });
    }

    if (
      userIdToUpdate !== req.userId &&
      !checkPermissions(currentUser, "update")
    ) {
      res.status(403).json({
        message:
          "Permission denied: You can only update your own profile or require update permissions",
      });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await argon2.hash(password);
    }

    const updatedUser = await updateUserById(userIdToUpdate, {
      name,
      email,
      password: hashedPassword,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error updating user",
        error: (error as Error).message,
      });
  }
}

export async function deleteUserController(req: CustomRequest, res: Response) {
  const userIdToDisable = req.params.id;

  try {
    const currentUser = (await userModel.findById(req.userId)) as UserType;
    if (!currentUser) {
      res.status(404).json({ message: "Current user not found" });
    }

    if (
      userIdToDisable !== req.userId &&
      !checkPermissions(currentUser, "delete")
    ) {
      res.status(403).json({
        message:
          "Permission denied: You can only disable your own profile or require delete permissions",
      });
    }

    const result = await deleteUserById(userIdToDisable);
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User disabled successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error disabling user",
      error: (error as Error).message,
    });
  }
}
