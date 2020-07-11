import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";

export class ReturnFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Return/];
  }
  public parse(source: string): ReturnFunction {
    if (source.trim().match(this.getPatterns()[0]) != null) {
      return new ReturnFunction();
    }
    throw new FunctionNotMatchError(this.name);
  }
  public execute(context: Context): void {}
  constructor() {
    super("Return");
  }
  public static get instance() {
    return new ReturnFunction();
  }
}
