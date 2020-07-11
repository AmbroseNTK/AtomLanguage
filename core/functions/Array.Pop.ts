import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { Variable } from "../Variable";
import { VariableFactory } from "../VariableFactory";

export class ArrayPopFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Array\.Pop[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): ArrayPopFunction {
    let tokens = source.trim().match(this.getPatterns()[0]);
    if (tokens == null) {
      throw new FunctionNotMatchError(this.name);
    }
    return new ArrayPopFunction(
      VariableFactory.parse(tokens[1]),
      VariableFactory.parse(tokens[2])
    );
  }
  public execute(context: Context): void {
    if (this.fromVariable == null || this.toVariable == null) {
      return;
    }
    if (!(this.fromVariable.nameOnly && this.toVariable.nameOnly)) {
      throw new Error("Cannot pop on single value");
    }
    context.popFromArray(this.fromVariable.name, this.toVariable.name);
  }

  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Array.Pop");
  }

  public static get instance() {
    return new ArrayPopFunction(null, null);
  }
}
