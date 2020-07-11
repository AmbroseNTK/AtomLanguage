import { Variable } from "./Variable";
import { IDataAccessible } from "./IDataAccessible";

export class Str extends Variable implements IDataAccessible {
  constructor(name: string, public data: string) {
    super(name, false);
  }
  getData(): string | number | boolean | null {
    return this.data;
  }
}
