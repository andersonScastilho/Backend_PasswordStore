import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(404, message);
  }
}
