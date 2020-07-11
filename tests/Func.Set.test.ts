import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { Str } from "../core/primities/Str";
import { Num } from "../core/primities/Num";
import { SetFunction } from "../core/functions/Set";

describe("Func.Set test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let setFunc1 = SetFunction.instance.parse("Set 3 to $abc");
    expect((<Num>setFunc1.fromVariable).data).to.equal(3);
    expect(setFunc1.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc1 = SetFunction.instance.parse("Set 3 to $abc");
    setFunc1.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(3);
    setFunc1 = SetFunction.instance.parse("Set $abc to $def");
    setFunc1.execute(ctx);
    expect(ctx.Context.def.value).to.equal(3);
    setFunc1 = SetFunction.instance.parse("Set $xxx to $abc");
    try {
      setFunc1.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Variable $xxx does not exist");
    }
    setFunc1 = SetFunction.instance.parse("Set $abc to 3.14");
    try {
      setFunc1.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Cannot set value to value");
    }
  });
});
