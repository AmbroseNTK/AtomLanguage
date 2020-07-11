import { Function } from "../Function";
import { Context } from "../Context";
import { FunctionNotMatchError } from "../FunctionNotMatchError";
import { Str } from "../primities/Str";
import { Condition } from "../Condition";
import { VariableFactory } from "../VariableFactory";

export class JumpFunction extends Function {
  public getPatterns(): RegExp[] {
    return [
      /[\n\s]*Jump[\n\s]*(.*)[\n\s]*if[\n\s]*(.*)/,
      /[\n\s]*Jump[\n\s]*(.*)/,
    ];
  }
  public parse(source: string): JumpFunction {
    let patterns = this.getPatterns();
    let tokens = source.trim().match(patterns[0]);
    if (tokens == null) {
      tokens = source.trim().match(patterns[1]);
      if (tokens == null) {
        throw new FunctionNotMatchError(this.name);
      }
    }
    let label = VariableFactory.parse(tokens[1]);
    if (!(label instanceof Str)) {
      throw new Error("Label must be a string");
    }
    if (tokens.length == 3) {
      return new JumpFunction(label, Condition.parse(tokens[2]));
    }
    return new JumpFunction(label, null);
  }
  public execute(context: Context): void {
    if (this.label == null) {
      return;
    }
    if (this.condition != null) {
      if (!this.condition.execute(context)) {
        context.jumpFlag = "";
        return;
      }
    }
    context.jumpFlag = this.label.data;
  }
  constructor(public label: Str | null, public condition: Condition | null) {
    super("Jump");
  }
  public static get instance() {
    return new JumpFunction(null, null);
  }
}
