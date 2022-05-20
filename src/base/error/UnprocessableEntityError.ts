import BaseError from "./BaseError";

class UnprocessableEntityError extends BaseError {
  constructor(message: string) {
    super(message, 422, "UnprocessableEntityError");
  }
}

export default UnprocessableEntityError;
