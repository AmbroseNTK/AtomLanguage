import { Variable } from "./Variable";
import { Null } from "./primities/Null";
import { Boolean } from "./primities/Boolean";
import { Str } from "./primities/Str";
import { Num } from "./primities/Num";
import { Any } from "./primities/Any";

export class VariableFactory {
  private static variablePattern = /\$([a-zA-Z0-9.]*)/;
  private static stringPattern = /\"(.*)\"/;
  private static numberPattern = /\-{0,1}[0-9]+\.{0,1}[0-9]*/;

  public static parse(source: string): Variable {
    source = source.trim();
    if (source == "null") {
      return new Null();
    }
    if (source == "true") {
      return new Boolean("", true);
    }
    if (source == "false") {
      return new Boolean("", false);
    }
    let tokens = source.match(this.stringPattern);
    if (tokens != null) {
      return new Str("", tokens[1]);
    }
    tokens = source.match(this.numberPattern);
    if (tokens != null) {
      return new Num("", parseFloat(tokens[0]));
    }
    tokens = source.match(this.variablePattern);
    if (tokens != null) {
      return new Variable(tokens[1]);
    }
    throw new Error(source + " is not valid value");
  }
  public static getValueFromVariable(variable: Variable): any {
    if (variable instanceof Str) {
      return variable.data;
    }
    if (variable instanceof Num) {
      return variable.data;
    }
    if (variable instanceof Null) {
      return null;
    }
    if (variable instanceof Boolean) {
      return variable.data;
    }
    if (variable instanceof Any) {
      return variable.data;
    }
  }
  public static getVariableFromValue(value: any) {
    if (typeof value == "number") {
      return new Num("", <number>value);
    }
    if (typeof value == "string") {
      return new Str("", value);
    }
    if (typeof value == "boolean") {
      return new Boolean("", <boolean>value);
    }
    if (typeof value == "undefined" || value == null) {
      return new Null();
    }
    return new Any("", value);
  }
}
