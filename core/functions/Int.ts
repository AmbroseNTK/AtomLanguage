import { Function } from "../Function";
import { Variable } from "../Variable";
import { Context } from "../Context";
import { Num } from "../Num";
import { VariableFactory } from "../VariableFactory";

export class IntFunction extends Function {
  public execute(context: Context): void {
    if (this.fromVariable == null || this.toVariable == null) {
      return;
    }
    if (!this.toVariable.nameOnly) {
      throw new Error("Cannot assign to value");
    }
    let toVariable = context.getVariable(this.toVariable.name);
    let fromVariable = this.fromVariable;
    let result: any;
    if (this.fromVariable.nameOnly) {
      fromVariable = context.getVariable(this.fromVariable.name);
    }
    if (!(fromVariable instanceof Num)) {
      throw new Error("Int apply for numbers only");
    }

    result = Math.floor(VariableFactory.getValueFromVariable(fromVariable));
    context.createVariable(toVariable.name, new Num("", result));
  }
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Int[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): IntFunction {
    let variables = this.defaultParse(source);
    return new IntFunction(variables[0], variables[1]);
  }
  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Int");
  }
  public static get instance(): IntFunction {
    return new IntFunction(null, null);
  }
}
