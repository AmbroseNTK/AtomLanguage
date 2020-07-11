import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { SetFunction } from "../core/functions/Set";
import { IntFunction } from "../core/functions/Int";

describe("Func.Int test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let intFunc = IntFunction.instance.parse("Int 3 to $abc");
    expect(intFunc.fromVariable?.nameOnly).to.equal(false);
    expect(intFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc = SetFunction.instance.parse("Set 3.14 to $abc");
    let intFunc = IntFunction.instance.parse("Int $abc to $abc");
    setFunc.execute(ctx);
    intFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(3);
    intFunc = IntFunction.instance.parse('Int "Hello World" to $abc');
    try {
      intFunc.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Int apply for numbers only");
    }
  });
});
