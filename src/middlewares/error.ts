import { ErrorRequestHandler } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler: ErrorRequestHandler = async (
  error,
  _req,
  res,
  next
) => {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({ error: "Failed to connect to the database" });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(400).json({ error: "The record no exists" });
    }

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Record already exists" });
    }

    return res.status(400).json({ error: error.message });
  }

  if (error instanceof Error) {
    if (error.message === "invalid token") {
      return res.status(401).json({ error: error.message });
    }

    return res.status(400).json({ error: error.message });
  }

  if (error) {
    return res.status(400).json({ error: "An error occurred" });
  }

  next();
};
