import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../config";
import { userModel } from "../user/user.model";

interface CustomRequest extends Request {
  userId?: string;
}

export async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
  let token = req.headers["x-access-token"] as string;

  if (!token) res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    console.log(decoded.id)
    req.userId = decoded.id;

    const user = await userModel.findById(req.userId, { password: 0 });
    if (!user) res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
     res.status(401).json({ message: "Unauthorized!" });
  };
};
