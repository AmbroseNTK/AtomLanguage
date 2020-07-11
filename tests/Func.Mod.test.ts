import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { SetFunction } from "../core/functions/Set";
import { ModFunction } from "../core/functions/Mod";

describe("Func.Mod test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let modFunc = ModFunction.instance.parse("Mod 3 to $abc");
    expect(modFunc.fromVariable?.nameOnly).to.equal(false);
    expect(modFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc = SetFunction.instance.parse("Set 3 to $abc");
    let modFunc = ModFunction.instance.parse("Mod 2 to $abc");
    setFunc.execute(ctx);
    modFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(1);
    setFunc = SetFunction.instance.parse("Set 0.5 to $def");
    modFunc = ModFunction.instance.parse("Mod $def to $abc");
    setFunc.execute(ctx);
    modFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(0);
    modFunc = ModFunction.instance.parse("Mod 0 to $abc");
    try {
      modFunc.execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Divided by zero");
    }
  });
});
