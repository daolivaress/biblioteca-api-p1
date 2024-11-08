import { userModel as User } from "../user/user.model";
import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}

export const permissions = {
  canCreateBook: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.userId);
    if (user && user.canCreateBook) {
      next();
      return;
    }
    res
      .status(403)
      .json({ message: "You do not have permission to create books" });
  },

  canEditBook: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.userId);
    if (user && user.canEditBook) {
      next();
      return;
    }
    res
      .status(403)
      .json({ message: "You do not have permission to edit books" });
  },

  canDeleteBook: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const user = await User.findById(req.userId);
    if (user && user.canDeleteBook) {
      next();
      return;
    }
    res
      .status(403)
      .json({ message: "You do not have permission to delete books" });
  },

  canEditUser: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (user && (user.canEditUser || user._id.toString() === req.params.id)) {
        next();
        return;
      }
      res
        .status(403)
        .json({ message: "You do not have permission to edit users" });
    } catch (error) {
      res.status(500).json({ message: "Error verifying permissions" });
    }
  },

  canDeleteUser: async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await User.findById(req.userId);
      if (
        user &&
        (user.canDeleteUser || user._id.toString() === req.params.id)
      ) {
        next();
        return;
      }
      res
        .status(403)
        .json({ message: "You do not have permission to disable users" });
    } catch (error) {
      res.status(500).json({ message: "Error verifying permissions" });
    }
  },
};
