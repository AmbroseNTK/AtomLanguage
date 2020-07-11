import { Variable } from "../Variable";

export class Any extends Variable {
  constructor(name: string, public data: any) {
    super(name);
  }
}
