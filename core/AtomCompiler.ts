import { Context } from "./Context";
import { SourceFile } from "./SourceFile";

export class AtomCompiler {
  public context: Context | undefined;
  public mainProgram: SourceFile | undefined;
  constructor(public entryFileName: string) {}
  public compile() {
    this.context = new Context({});
    this.mainProgram = new SourceFile(this.entryFileName, "");
  }
  public execute() {
    if (this.mainProgram != null && this.context != null) {
      let isBegin = false;
      for (let i = 0; i < this.mainProgram?.lines.length; i++) {
        if (this.mainProgram.lines[i].fn.name == "Begin") {
          isBegin = true;
          continue;
        } else if (!isBegin) {
          continue;
        }
        this.mainProgram.lines[i].fn.execute(this.context);
      }
    }
  }
}
