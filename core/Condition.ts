import { Variable } from "./Variable";
import { VariableFactory } from "./VariableFactory";
import { Context } from "./Context";

export class Condition {
  public static pattern = /[\n\s]*([\"a-zA-Z0-9$._-]*)[\n\s]*([\>|\<|\=|\!]{0,1}[\=]{0,1})[\n\s]*([\"a-zA-Z0-9$._-]*)[\n\s]*/;
  public static parse(source: string): Condition {
    let tokens = source.trim().match(this.pattern);
    if (
      tokens == null ||
      tokens[1] == undefined ||
      tokens[2] == undefined ||
      tokens[3] == undefined
    ) {
      throw new Error(source + " is not a valid condition statement");
    }
    return new Condition(
      VariableFactory.parse(tokens[1]),
      tokens[2],
      VariableFactory.parse(tokens[3])
    );
  }

  public execute(context: Context): boolean {
    if (this.left == null || this.right == null) {
      throw new Error("Invalid condition statement");
    }
    let leftValue;
    if (this.left.nameOnly) {
      leftValue = context.getVariableValue(this.left.name);
    } else {
      leftValue = VariableFactory.getValueFromVariable(this.left);
    }
    let rightValue;
    if (this.right.nameOnly) {
      rightValue = context.getVariableValue(this.right.name);
    } else {
      rightValue = VariableFactory.getValueFromVariable(this.right);
    }
    if (this.operator == "=" || this.operator == "==") {
      return leftValue == rightValue;
    }
    if (this.operator == "!=") {
      return leftValue != rightValue;
    }
    if (
      typeof leftValue == "string" ||
      typeof leftValue == "undefined" ||
      typeof rightValue == "string" ||
      typeof rightValue == "undefined"
    ) {
      throw new Error(
        "Cannot evaluate " + leftValue + " " + this.operator + " " + rightValue
      );
    }
    if (this.operator == "<") {
      return leftValue < rightValue;
    }
    if (this.operator == "<=") {
      return leftValue <= rightValue;
    }
    if (this.operator == ">") {
      return leftValue > rightValue;
    }
    if (this.operator == ">=") {
      return leftValue >= rightValue;
    }
    throw new Error(
      "Cannot evaluate " + leftValue + " " + this.operator + " " + rightValue
    );
  }

  constructor(
    public left: Variable | null,
    public operator: string,
    public right: Variable | null
  ) {}
  public static get instance() {
    return new Condition(null, "", null);
  }
}
