import { Variable } from "./Variable";
import { IDataAccessible } from "./IDataAccessible";

export class Null extends Variable implements IDataAccessible {
  public data = null;
  constructor() {
    super("NULL", false);
  }
  getData(): string | number | boolean | null {
    return null;
  }
}
