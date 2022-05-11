import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppError } from "./errors/appError";
import userRouter from "./routes/users.routes";
import productRouter from "./routes/product.routes";
import cartRouter from "./routes/cart.routes";
import buyRouter from "./routes/buy.routes";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/buy", buyRouter);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3000);
