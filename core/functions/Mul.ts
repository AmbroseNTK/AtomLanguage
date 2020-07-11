import { Function } from "../Function";
import { Variable } from "../Variable";
import { Context } from "../Context";
import { Num } from "../Num";
import { VariableFactory } from "../VariableFactory";

export class MulFunction extends Function {
  public execute(context: Context): void {
    if (this.fromVariable == null || this.toVariable == null) {
      return;
    }
    if (!this.toVariable.nameOnly) {
      throw new Error("Cannot mul to value");
    }
    let toVariable = context.getVariable(this.toVariable.name);
    let fromVariable = this.fromVariable;
    let result: any;
    if (this.fromVariable.nameOnly) {
      fromVariable = context.getVariable(this.fromVariable.name);
    }
    if (!(toVariable instanceof Num && fromVariable instanceof Num)) {
      throw new Error("Multiply apply for numbers only");
    }
    result =
      context.getVariableValue(toVariable.name) *
      VariableFactory.getValueFromVariable(fromVariable);
    context.createVariable(toVariable.name, new Num("", result));
  }
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Mul[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): MulFunction {
    let variables = this.defaultParse(source);
    return new MulFunction(variables[0], variables[1]);
  }
  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Mul");
  }
  public static get instance(): MulFunction {
    return new MulFunction(null, null);
  }
}
