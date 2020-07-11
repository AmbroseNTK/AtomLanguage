import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";

export class BeginFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Begin/];
  }
  public parse(source: string): BeginFunction {
    if (source.trim().match(this.getPatterns()[0]) != null) {
      return new BeginFunction();
    }
    throw new FunctionNotMatchError(this.name);
  }
  public execute(context: Context): void {}
  constructor() {
    super("Begin");
  }
  public static get instance() {
    return new BeginFunction();
  }
}
