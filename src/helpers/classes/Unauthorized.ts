import { CustomError } from "./CustomError";

export class Unauthorized extends CustomError {
  constructor(message: string) {
    super(401, message);
  }
}
