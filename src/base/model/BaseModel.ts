abstract class BaseModel {
  createdAt?: string;

  protected constructor(public id?: string) {}
}

export default BaseModel;
