import { Request, Response } from "express";
import { findUserById } from "../actions/user/read.user.action";
import { updateUserById } from "../actions/user/update.user.action";
import { deleteUserById } from "../actions/user/delete.user.action";
import argon2 from "argon2";

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

  const userId = req.params.id || req.userId;

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await argon2.hash(password);
    }
    const updatedUser = await updateUserById(userId as string, {
      name,
      email,
      password: hashedPassword,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
    res
      .status(400)
      .json({
      message: "Error updating user",
      error: (error as Error).message,
      });
  };
};

export async function deleteUserController(req: CustomRequest, res: Response) {
  const userId = req.params.id;
  try {
    const result = await deleteUserById(userId);
    if (!result) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: (error as Error).message,
    });
  };
};
