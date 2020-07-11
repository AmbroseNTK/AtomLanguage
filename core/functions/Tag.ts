import { Function } from "../Function";
import { Context } from "../Context";
import { Str } from "../primities/Str";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { VariableFactory } from "../VariableFactory";

export class TagFunction extends Function {
  public getPatterns(): RegExp[] {
    return [/[\n\s]*Tag[\n\s]*\"(.*)\"/];
  }
  public parse(source: string): TagFunction {
    let tokens = source.match(this.getPatterns()[0]);
    if (tokens == null) {
      throw new FunctionNotMatchError(this.name);
    }
    let label = VariableFactory.parse(tokens[1]);
    if (!(label instanceof Str)) {
      throw new Error("Tag name should be a string");
    }
    return new TagFunction(label);
  }
  public execute(context: Context): void {}

  constructor(public label: Str) {
    super("Tag");
  }
}
