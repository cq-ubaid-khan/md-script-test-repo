import bcrypt from "bcryptjs";

class BcryptHashing {
  static Salt = 12;

  static bcryptHash(value: string):Promise<string> {
    return bcrypt.hash(value, BcryptHashing.Salt);
  }

  static bcryptCompare(value1: string, value2: string):Promise<boolean> {
    return bcrypt.compare(value1, value2);
  }
}

export default BcryptHashing;
