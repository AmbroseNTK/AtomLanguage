import { Function } from "../Function";
import { Context } from "../Context";
import { Variable } from "../Variable";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { VariableFactory } from "../VariableFactory";

export class ArrayCreateFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Array\.Create[\n\s]*(.*)/];
  }
  public parse(source: string): ArrayCreateFunction {
    let tokens = source.trim().match(this.getPatterns()[0]);
    if (tokens == null) {
      throw new FunctionNotMatchError(this.name);
    }
    let variable = VariableFactory.parse(tokens[1]);
    if (variable.nameOnly) {
      return new ArrayCreateFunction(variable);
    }
    throw new Error(tokens[1] + " is not a variable name");
  }
  public execute(context: Context): void {
    if (this.variable == null) {
      return;
    }
    context.createArray(this.variable.name);
  }

  constructor(public variable: Variable | null) {
    super("Array.Create");
  }
  public static get instance() {
    return new ArrayCreateFunction(null);
  }
}
