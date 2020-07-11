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
  ];
  public static parse(fileName: string, source: string): Array<FunctionLine> {
    let result = new Array<FunctionLine>();
    let lines = source.trim().split("\n");
    for (let i = 0; i < lines.length; i++) {
      for (let parser of this.parsers) {
        try {
          let fn = parser.parse(lines[i]);
          result.push(new FunctionLine(fileName, i + 1, fn));
          break;
        } catch (e) {
          if (e instanceof FunctionNotMatchError) {
            continue;
          }
          throw new ParseError(e, fileName, i + 1);
        }
      }
    }
    return result;
  }
}
