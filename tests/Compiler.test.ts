import { expect } from "chai";
import "mocha";
import { AtomCompiler } from "../core/AtomCompiler";

describe("Compiler test", () => {
  it("Compile and execute the first Atom program", () => {
    let compiler = new AtomCompiler(
      "helloWorld.atom",
      __dirname + "/source.atom/"
    );
    compiler.compile();
    compiler.execute();
    expect(compiler.context?.Context.greeting.value).to.equal("Hello World");
  });
  it("Import and jump test", () => {
    let compiler = new AtomCompiler("helloB.atom", __dirname + "/source.atom/");
    compiler.compile();
    compiler.execute();
    expect(compiler.context?.Context.Sum.children.result.value).to.equal(5);
    expect(compiler.context?.Context.Pow.children.result.value).to.equal(8);
  });
});
