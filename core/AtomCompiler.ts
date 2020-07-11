import { Context } from "./Context";
import { SourceFile } from "./SourceFile";
import { FunctionLine } from "./FunctionLine";
import { TagFunction } from "./functions/Tag";

export class AtomCompiler {
  public context: Context | undefined;
  public mainProgram: SourceFile | undefined;
  public files: Array<SourceFile>;
  public pointer: FunctionLine | null | undefined = null;
  constructor(public entryFileName: string, public rootDir: string) {
    this.files = [];
  }
  public compile() {
    this.context = new Context({});
    this.mainProgram = new SourceFile(this, this.entryFileName, "main");
  }

  private movePointer(alias: string, tagName: string = "") {
    if (tagName == "") {
      for (let file of this.files) {
        if (file.alias == alias) {
          if (this.pointer != null) {
            let lineIndex = file.lines.findIndex(
              (line) => line.line == this.pointer?.line
            );
            if (lineIndex > file.lines.length - 1) {
              this.pointer = null;
              return;
            } else {
              this.pointer = file.lines[lineIndex + 1];
              return;
            }
          }
        }
      }
    } else {
      for (let file of this.files) {
        if (file.alias == alias) {
          for (let tag of file.tagLine) {
            if (tag.fn instanceof TagFunction && tag.fn.label != null) {
              if (tagName == tag.fn.label.data) {
                this.pointer = tag;
                return;
              }
            }
          }
        }
      }
    }
    throw new Error("Not found " + alias + "." + tagName);
  }
  public execute() {
    // Step 1: Looking for entry point
    if (this.mainProgram != null && this.context != null) {
      for (let i = 0; i < this.mainProgram?.lines.length; i++) {
        if (this.mainProgram.lines[i].fn.name == "Begin") {
          this.pointer = this.mainProgram.lines[i];
          break;
        }
      }
    }
    while (this.pointer != null && this.context != null) {
      this.pointer.fn.execute(this.context);
      if (this.pointer.fn.name == "Jump" && this.context.jumpFlag != "") {
        this.context.callStack.push(
          new FunctionLine(
            this.pointer.fileName,
            this.pointer.line,
            this.pointer.fn,
            this.pointer.alias
          )
        );
        let tagTokens = this.context.jumpFlag.split(".");
        if (tagTokens.length > 1) {
          this.movePointer(
            tagTokens[0],
            tagTokens.slice(1).reduce((prev, current) => prev + "." + current)
          );
          continue;
        }
        this.movePointer(this.pointer.alias, tagTokens[0]);
        continue;
      }
      if (this.pointer.fn.name == "Return") {
        if (this.context.callStack.length == 0) {
          return;
        }
        this.pointer = this.context.callStack.pop();
        if (this.pointer != null) {
          this.movePointer(this.pointer?.alias);
          continue;
        }
      }
      if (this.pointer != null) {
        this.movePointer(this.pointer?.alias);
      }
    }
  }
}
