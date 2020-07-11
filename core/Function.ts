import { Variable } from "./Variable";
import { FunctionNotMatchError } from "./FunctionNotMatchError";
import { VariableFactory } from "./VariableFactory";
import { Context } from "./Context";

export abstract class Function {
  constructor(public name: string) {}
  public abstract getPatterns(): Array<RegExp>;
  public abstract parse(source: string): Function;
  public abstract execute(context: Context): void;

  protected defaultParse(source: string): Array<Variable> {
    let patterns = this.getPatterns();
    for (let pattern of patterns) {
      let tokens = source.match(pattern);
      if (tokens != null) {
        return [
          VariableFactory.parse(tokens[1]),
          VariableFactory.parse(tokens[2]),
        ];
      }
    }
    throw new FunctionNotMatchError(this.name);
  }
}
