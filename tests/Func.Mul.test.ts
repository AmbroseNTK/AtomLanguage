import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { SetFunction } from "../core/functions/Set";
import { MulFunction } from "../core/functions/Mul";

describe("Func.Mul test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let mulFunc = MulFunction.instance.parse("Mul 3 to $abc");
    expect(mulFunc.fromVariable?.nameOnly).to.equal(false);
    expect(mulFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc = SetFunction.instance.parse("Set 3 to $abc");
    let mulFunc = MulFunction.instance.parse("Mul 3 to $abc");
    setFunc.execute(ctx);
    mulFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(9);
    setFunc = SetFunction.instance.parse("Set -3.14 to $def");
    mulFunc = MulFunction.instance.parse("Mul $def to $abc");
    setFunc.execute(ctx);
    mulFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(-28.26);
    mulFunc = MulFunction.instance.parse('Mul "ABC" to $abc');
    try {
      mulFunc.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Multiply apply for numbers only");
    }
  });
});
