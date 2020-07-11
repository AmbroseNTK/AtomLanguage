import { ISingleton } from "../ISingleton";
import { Function } from "../Function";
import { Variable } from "../Variable";
import { Context } from "../Context";

export class SetFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Set[\n\s]*(.*)[\n\s]*to[\n\s]*(.*)/];
  }
  public parse(source: string): SetFunction {
    let variables = this.defaultParse(source);
    return new SetFunction(variables[0], variables[1]);
  }
  public execute(context: Context): void {
    if (!this.toVariable?.nameOnly) {
      throw new Error("Cannot set value to value");
    }
    if (this.fromVariable?.nameOnly) {
      if (this.toVariable != null) {
        context.createVariable(
          this.toVariable?.name,
          context.getVariable(this.fromVariable.name)
        );
      }
    } else {
      if (this.fromVariable != null) {
        context.createVariable(this.toVariable.name, this.fromVariable);
      }
    }
  }

  constructor(
    public fromVariable: Variable | null,
    public toVariable: Variable | null
  ) {
    super("Set");
  }
  public static get instance(): SetFunction {
    return new SetFunction(null, null);
  }
}
