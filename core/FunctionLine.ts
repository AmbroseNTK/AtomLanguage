import { Function } from "./Function";

export class FunctionLine {
  constructor(
    public fileName: string,
    public line: number,
    public fn: Function
  ) {}
}
