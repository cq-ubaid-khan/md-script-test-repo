class BaseError {
  errorCode: number;
  message: string;

  constructor(message: string, errorCode: number, public name: string) {
    this.message = message;
    this.errorCode = errorCode;
    this.name = name;
  }

  getErrorCode():number {
    return this.errorCode;
  }

  getErrorMessage():string {
    return this.message;
  }
}

export default BaseError;
