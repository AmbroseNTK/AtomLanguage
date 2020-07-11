import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { Str } from "../core/Str";
import { Num } from "../core/Num";
import { AddFunction } from "../core/functions/Add";
import { SetFunction } from "../core/functions/Set";

describe("Func.Add test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let addFunc = AddFunction.instance.parse("Add 3 to $abc");
    expect(addFunc.fromVariable?.nameOnly).to.equal(false);
    expect(addFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let setFunc = SetFunction.instance.parse("Set 0 to $abc");
    let addFunc = AddFunction.instance.parse("Add 3 to $abc");
    setFunc.execute(ctx);
    addFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(3);
    addFunc = AddFunction.instance.parse("Add -3 to $abc");
    addFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(0);
    setFunc = SetFunction.instance.parse("Set 3.14 to $def");
    addFunc = AddFunction.instance.parse("Add $def to $abc");
    setFunc.execute(ctx);
    addFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal(3.14);

    setFunc = SetFunction.instance.parse('Set "Hello" to $def');
    setFunc.execute(ctx);
    addFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal("3.14Hello");
    addFunc = AddFunction.instance.parse("Add $abc to $abc");
    addFunc.execute(ctx);
    expect(ctx.Context.abc.value).to.equal("3.14Hello3.14Hello");
  });
});
