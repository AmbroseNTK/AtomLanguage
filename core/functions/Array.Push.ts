import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { Variable } from "../Variable";
import { VariableFactory } from "../VariableFactory";

export class ArrayPushFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Array\.Push[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): ArrayPushFunction {
    let tokens = source.trim().match(this.getPatterns()[0]);
    if (tokens == null) {
      throw new FunctionNotMatchError(this.name);
    }
    return new ArrayPushFunction(
      VariableFactory.parse(tokens[1]),
      VariableFactory.parse(tokens[2])
    );
  }
  public execute(context: Context): void {
    if (this.valueVariable == null || this.toVariable == null) {
      return;
    }
    if (this.valueVariable.nameOnly) {
      this.valueVariable = context.getVariable(this.valueVariable.name);
    }
    if (!this.toVariable.nameOnly) {
      throw new Error("Element must be pushed to an array");
    }
    if (this.valueVariable.nameOnly) {
      context.pushToArray(
        this.toVariable.name,
        context.getVariableValue(this.valueVariable.name)
      );
    }
    context.pushToArray(
      this.toVariable.name,
      VariableFactory.getValueFromVariable(this.valueVariable)
    );
  }

  constructor(
    public valueVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Array.Push");
  }

  public static get instance() {
    return new ArrayPushFunction(null, null);
  }
}
