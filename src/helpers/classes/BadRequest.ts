import { CustomError } from "./CustomError";

export class BadRequest extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
