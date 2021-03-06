import { Function } from "../Function";
import { Variable } from "../Variable";
import { Context } from "../Context";
import { Num } from "../primities/Num";
import { VariableFactory } from "../VariableFactory";

export class ModFunction extends Function {
  public execute(context: Context): void {
    if (this.fromVariable == null || this.toVariable == null) {
      return;
    }
    if (!this.toVariable.nameOnly) {
      throw new Error("Cannot mod to value");
    }
    let toVariable = context.getVariable(this.toVariable.name);
    let fromVariable = this.fromVariable;
    let result: any;
    if (this.fromVariable.nameOnly) {
      fromVariable = context.getVariable(this.fromVariable.name);
    }
    if (!(toVariable instanceof Num && fromVariable instanceof Num)) {
      throw new Error("Mod apply for numbers only");
    }
    if (VariableFactory.getValueFromVariable(fromVariable) == 0) {
      throw new Error("Divided by zero");
    }
    result =
      context.getVariableValue(toVariable.name) %
      VariableFactory.getValueFromVariable(fromVariable);
    context.createVariable(toVariable.name, new Num("", result));
  }
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Mod[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): ModFunction {
    let variables = this.defaultParse(source);
    return new ModFunction(variables[0], variables[1]);
  }
  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Mod");
  }
  public static get instance(): ModFunction {
    return new ModFunction(null, null);
  }
}
