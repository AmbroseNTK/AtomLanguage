import { Variable } from "./Variable";
import { IDataAccessible } from "./IDataAccessible";

export class Boolean extends Variable implements IDataAccessible {
  constructor(name: string, public data: boolean) {
    super(name, false);
  }
  getData(): string | number | boolean | null {
    return this.data;
  }
}
