import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const protectedRoute = async (
  req: any,
  res: any,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ messgae: "not authenticated" });
  }

  try {
    const secret = process.env.JWT_SECRET || "secret";
    const decoded: any = jwt.verify(token, secret);
    req.user = await User.findOne(decoded.id);
    next();
  } catch (err) {
    return res.status(401).json({ messgae: "not authenticated" });
  }
};

export const authorize = (...roles: Array<string>) => {
  return (req: any, res: any, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({ messgae: "not authenticated" });
    }
    next();
  };
};
