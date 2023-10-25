import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { CustomError } from "helpers/classes/CustomError";

export const errorHandler: ErrorRequestHandler = async (
  error,
  _req,
  res,
  next
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
      },
    });
  }

  if (error instanceof ZodError) {
    const zodErrors: Record<string, string> = {};

    error.issues.forEach((zodError) => {
      const [path] = zodError.path;
      zodErrors[path ?? "error"] = zodError.message;
    });

    return res.status(400).json({
      message:
        "The request data is missing or invalid. Please check your input and try again",
      errors: zodErrors,
    });
  }

  if (error) {
    return res.status(400).json({ error: "An error occurred" });
  }

  next();
};
