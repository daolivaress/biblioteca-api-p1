import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../../config";
import { userModel } from "../../models/user.model";

interface CustomRequest extends Request {
  userId?: string;
}

export async function verifyToken(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return; 
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    if (typeof decoded === "string") {
      res.status(401).json({ message: "Invalid token" });
      return; // Asegura el retorno
    };

    req.userId = decoded.id;

    const user = await userModel.findById(req.userId, { password: 0 });
    if (!user) {
      res.status(404).json({ message: "No user found" });
      return;
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  };
};
