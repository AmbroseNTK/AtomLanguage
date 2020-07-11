import { Function } from "./Function";
import { FunctionLine } from "./FunctionLine";
import { Parser } from "./Parser";
import { ParseError } from "./ParseError";
import fs from "fs";
import { ImportFunction } from "./functions/Import";
import { AtomCompiler } from "./AtomCompiler";
export class SourceFile {
  public lines: Array<FunctionLine> = [];
  public entryPoint = -1;
  public dependencies: Array<SourceFile> = [];
  public tagLine: Array<FunctionLine> = [];
  constructor(
    compiler: AtomCompiler,
    public fileName: string,
    public alias: string = ""
  ) {
    let source = "";
    try {
      source = fs.readFileSync(compiler.rootDir + fileName, {
        encoding: "utf-8",
      });
    } catch (e) {
      throw new ParseError(
        new Error("Cannot read file: " + compiler.rootDir + fileName),
        fileName,
        0
      );
    }
    this.lines = Parser.parse(fileName, alias, source);
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
    this.tagLine = this.lines.filter((line) => line.fn.name == "Tag");
    let imports = this.lines.filter((line) => line.fn.name == "Import");
    for (let importFn of imports) {
      if (importFn.fn instanceof ImportFunction) {
        let imp = <ImportFunction>importFn.fn;
        if (imp.fileName != null) {
          this.dependencies.push(
            new SourceFile(compiler, imp.fileName?.data, imp.alias?.data)
          );
        }
      }
    }
    compiler.files.push(this);
  }
}
