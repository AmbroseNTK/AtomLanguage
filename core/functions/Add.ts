import { Function } from "../Function";
import { Variable } from "../Variable";
import { Context } from "../Context";
import { Str } from "../primities/Str";
import { IDataAccessible } from "../IDataAccessible";
import { Num } from "../primities/Num";
import { VariableFactory } from "../VariableFactory";

export class AddFunction extends Function {
  public execute(context: Context): void {
    if (this.fromVariable == null || this.toVariable == null) {
      return;
    }
    if (!this.toVariable.nameOnly) {
      throw new Error("Cannot add to value");
    }
    let toVariable = context.getVariable(this.toVariable.name);
    let fromVariable = this.fromVariable;
    let result: any;
    if (this.fromVariable.nameOnly) {
      fromVariable = context.getVariable(this.fromVariable.name);
      result =
        context.getVariableValue(toVariable.name) +
        context.getVariableValue(fromVariable.name);
    }

    result =
      context.getVariableValue(toVariable.name) +
      VariableFactory.getValueFromVariable(fromVariable);
    if (toVariable instanceof Num && fromVariable instanceof Num) {
      context.createVariable(toVariable.name, new Num("", result));
      return;
    }
    context.createVariable(toVariable.name, new Str("", result));
  }
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Add[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): AddFunction {
    let variables = this.defaultParse(source);
    return new AddFunction(variables[0], variables[1]);
  }
  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Add");
  }
  public static get instance(): AddFunction {
    return new AddFunction(null, null);
  }
}
