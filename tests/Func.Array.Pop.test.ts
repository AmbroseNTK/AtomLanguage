import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { ArrayPushFunction } from "../core/functions/Array.Push";
import { ArrayCreateFunction } from "../core/functions/Array.Create";
import { ArrayPopFunction } from "../core/functions/Array.Pop";

describe("Func.Array.Pop test", () => {
  it("Parsing test", () => {
    let ctx = new Context({});
    let arrayPushFunc = ArrayPopFunction.instance.parse(
      "Array.Pop $bcd to $abc"
    );
    expect(arrayPushFunc.fromVariable?.nameOnly).to.equal(true);
    expect(arrayPushFunc.toVariable?.name).to.equal("abc");
  });
  it("Runtime test", () => {
    let ctx = new Context({});
    let arrayCreateFunc = ArrayCreateFunction.instance.parse(
      "Array.Create $abc"
    );
    arrayCreateFunc.execute(ctx);
    let arrayPushFunc = ArrayPushFunction.instance.parse(
      "Array.Push 2 to $abc"
    );
    arrayPushFunc.execute(ctx);
    arrayPushFunc = ArrayPushFunction.instance.parse("Array.Push 3 to $abc");
    arrayPushFunc.execute(ctx);
    let arrayPopFunc = ArrayPopFunction.instance.parse(
      "Array.Pop $abc to $temp"
    );
    arrayPopFunc.execute(ctx);
    expect(ctx.Context.temp.value).to.equal(3);
    arrayPopFunc.execute(ctx);
    expect(ctx.Context.temp.value).to.equal(2);
    arrayPopFunc.execute(ctx);
  });
});
