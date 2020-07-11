import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { Str } from "../core/Str";
import { Num } from "../core/Num";
import { AddFunction } from "../core/functions/Add";
import { SetFunction } from "../core/functions/Set";
import { ArrayPushFunction } from "../core/functions/Array.Push";
import { ArrayCreateFunction } from "../core/functions/Array.Create";

describe("Func.Array.Push test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let arrayPushFunc = ArrayPushFunction.instance.parse(
      "Array.Push 3 to $abc"
    );
    expect(arrayPushFunc.valueVariable?.nameOnly).to.equal(false);
    expect(arrayPushFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let arrayCreateFunc = ArrayCreateFunction.instance.parse(
      "Array.Create $abc"
    );
    arrayCreateFunc.execute(ctx);
    let arrayPushFunc = ArrayPushFunction.instance.parse(
      "Array.Push 3 to $abc"
    );
    arrayPushFunc.execute(ctx);
    expect(ctx.Context.abc.value.length).to.equal(1);
    arrayCreateFunc = ArrayCreateFunction.instance.parse("Array.Create $bcd");
    arrayPushFunc = ArrayPushFunction.instance.parse("Array.Push 4 to $bcd");
    arrayCreateFunc.execute(ctx);
    arrayPushFunc.execute(ctx);
    arrayPushFunc = ArrayPushFunction.instance.parse("Array.Push $bcd to $abc");
    arrayPushFunc.execute(ctx);

    expect(ctx.Context.abc.value[1][0]).to.equal(4);
  });
});
