import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { SetFunction } from "../core/functions/Set";
import { DivFunction } from "../core/functions/Div";

describe("Func.Div test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let divFunc = DivFunction.instance.parse("Div 3 to $abc");
    expect(divFunc.fromVariable?.nameOnly).to.equal(false);
    expect(divFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc = SetFunction.instance.parse("Set 3 to $abc");
    let divFunc = DivFunction.instance.parse("Div 3 to $abc");
    setFunc.execute(ctx);
    divFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(1);
    setFunc = SetFunction.instance.parse("Set 0.5 to $def");
    divFunc = DivFunction.instance.parse("Div $def to $abc");
    setFunc.execute(ctx);
    divFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(2);
    divFunc = DivFunction.instance.parse("Div 0 to $abc");
    try {
      divFunc.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Divided by zero");
    }
  });
});
