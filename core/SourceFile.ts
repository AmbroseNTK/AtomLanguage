import { Function } from "./Function";
import { FunctionLine } from "./FunctionLine";
import { Parser } from "./Parser";
import { ParseError } from "./ParseError";
import fs from "fs";
import { ImportFunction } from "./functions/Import";
export class SourceFile {
  public lines: Array<FunctionLine> = [];
  public entryPoint = -1;
  public dependencies: Array<SourceFile> = [];
  constructor(public fileName: string, public alias: string = "") {
    try {
      let source = fs.readFileSync(fileName, { encoding: "utf-8" });
      this.lines = Parser.parse(fileName, source);
      let entry = this.lines.filter((line) => line.fn.name == "Begin");
      if (entry.length > 1) {
        throw new ParseError(
          new Error("This file has more than one entry point"),
          fileName,
          entry[1].line
        );
      }
      if (entry.length == 1) {
        this.entryPoint = entry[0].line;
      }
      let imports = this.lines.filter((line) => line.fn.name == "Import");
      for (let importFn of imports) {
        if (importFn instanceof ImportFunction) {
          let imp = <ImportFunction>importFn;
          if (imp.fileName != null) {
            this.dependencies.push(
              new SourceFile(imp.fileName?.data, imp.alias?.data)
            );
          }
        }
      }
    } catch {
      throw new ParseError(new Error("Cannot read this file"), fileName, 0);
    }
  }
}
