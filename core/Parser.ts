import { BeginFunction } from "./functions/Begin";
import { ReturnFunction } from "./functions/Return";
import { SetFunction } from "./functions/Set";
import { AddFunction } from "./functions/Add";
import { MulFunction } from "./functions/Mul";
import { DivFunction } from "./functions/Div";
import { ModFunction } from "./functions/Mod";
import { ArrayCreateFunction } from "./functions/Array.Create";
import { ArrayPushFunction } from "./functions/Array.Push";
import { ArrayPopFunction } from "./functions/Array.Pop";
import { FunctionLine } from "./FunctionLine";
import { FunctionNotMatchError } from "./FunctionNotMatchError";
import { ParseError } from "./ParseError";
import { ImportFunction } from "./functions/Import";
import { JumpFunction } from "./functions/Jump";
import { TagFunction } from "./functions/Tag";

export class Parser {
  public static parsers = [
    ImportFunction.instance,
    BeginFunction.instance,
    ReturnFunction.instance,
    SetFunction.instance,
    AddFunction.instance,
    MulFunction.instance,
    DivFunction.instance,
    ModFunction.instance,
    ArrayCreateFunction.instance,
    ArrayPushFunction.instance,
    ArrayPopFunction.instance,
    JumpFunction.instance,
    TagFunction.instance,
  ];
  public static parse(
    fileName: string,
    alias: string,
    source: string
  ): Array<FunctionLine> {
    let result = new Array<FunctionLine>();
    let lines = source.trim().split(/\r?\n/);
    let matched = false;
    for (let i = 0; i < lines.length; i++) {
      matched = false;
      for (let parser of this.parsers) {
        try {
          let fn = parser.parse(lines[i].trim());
          result.push(new FunctionLine(fileName, i + 1, fn, alias));
          matched = true;
          break;
        } catch (e) {
          if (e.message.match(/(.*) is not match any pattern/)) {
            continue;
          }
          throw new ParseError(e, fileName, i + 1);
        }
      }
      if (lines[i].trim() == "") {
        continue;
      }
      if (!matched) {
        throw new ParseError(
          new Error("Syntax error: " + lines[i]),
          fileName,
          i + 1
        );
      }
    }
    return result;
  }
}
