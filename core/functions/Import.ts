import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { Str } from "../primities/Str";
import { VariableFactory } from "../VariableFactory";

export class ImportFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Import[\n\s]*\"(.*)\"[\n\s]*as[\n\s]*\"(.*)\"/];
  }
  public parse(source: string): ImportFunction {
    let tokens = source.trim().match(this.getPatterns()[0]);
    if (tokens == null) {
      throw new FunctionNotMatchError(this.name);
    }
    let variable = VariableFactory.parse(tokens[1]);
    if (!(variable instanceof Str)) {
      throw new Error("Module name should be a string");
    }
    let alias = VariableFactory.parse(tokens[2]);
    if (!(alias instanceof Str)) {
      throw new Error("Alias should be a string");
    }
    return new ImportFunction(variable, alias);
  }
  public execute(context: Context): void {}
  constructor(public fileName: Str | null, public alias: Str | null) {
    super("Import");
  }
  public static get instance() {
    return new ImportFunction(null, null);
  }
}
