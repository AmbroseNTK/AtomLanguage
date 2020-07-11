import { Variable } from "./Variable";
import { IDataAccessible } from "./IDataAccessible";

export class Num extends Variable implements IDataAccessible {
  constructor(name: string, public data: number) {
    super(name, false);
  }
  getData(): string | number | boolean | null {
    return this.data;
  }
}
