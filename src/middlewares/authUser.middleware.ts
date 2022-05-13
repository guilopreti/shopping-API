import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.JWT_SECRET || "default",
      (err: any, decoded: any) => {
        req.userEmail = decoded.email;
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default authUserMiddleware;
