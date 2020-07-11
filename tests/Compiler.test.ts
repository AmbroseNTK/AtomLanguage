import { expect } from "chai";
import "mocha";
import { AtomCompiler } from "../core/AtomCompiler";

describe("Compiler test", () => {
  it("Compile and execute the first Atom program", () => {
    let compiler = new AtomCompiler(__dirname + "/source.atom/helloWorld.atom");
    compiler.compile();
    compiler.execute();
    expect(compiler.context?.Context.greeting.value).to.equal("Hello World");
  });
});
