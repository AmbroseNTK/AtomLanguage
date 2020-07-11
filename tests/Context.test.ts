import { expect } from "chai";
import "mocha";
import { Context } from "../core/Context";
import { Str } from "../core/Str";
import { Num } from "../core/Num";
import { VariableFactory } from "../core/VariableFactory";
import { Variable } from "../core/Variable";

describe("Context test", () => {
  it("create variable", () => {
    let ctx = new Context({});
    ctx.createVariable("greeting", new Str("greeting", "Hello"));
    ctx.createVariable("greeting.vi", new Str("greeting", "Xin chao"));
    ctx.createVariable("piNumber", new Num("num", 3.14));
    expect(ctx.Context.greeting.value).to.equal("Hello");
    expect(ctx.Context.greeting.children.vi.value).to.equal("Xin chao");
    expect(ctx.Context.piNumber.value).to.equal(3.14);
  });
  it("get variable", () => {
    let ctx = new Context({});
    ctx.createVariable("greeting", new Str("greeting", "Hello"));
    ctx.createVariable("greeting.vi", new Str("greeting", "Xin chao"));
    ctx.createVariable("piNumber", new Num("num", 3.14));
    let greeting = ctx.getVariable("greeting.vi");
    expect(greeting instanceof Str).to.equal(true);
    expect((<Str>greeting).data).to.equal("Xin chao");
  });
  it("create array", () => {
    let ctx = new Context({});
    ctx.createArray("student.list");
    expect(ctx.Context.student.children.list.value.length).to.equal(0);
  });
  it("Push and pop in array", () => {
    let ctx = new Context({});
    ctx.createVariable("str", new Str("", ""));
    ctx.createVariable("number", new Num("", 0));
    ctx.createArray("arr1");
    ctx.pushToArray("arr1", "hello");
    ctx.pushToArray("arr1", 20);
    ctx.popFromArray("arr1", "num");
    ctx.popFromArray("arr1", "str");
    expect(ctx.Context.num.value).to.equal(20);
    expect(ctx.Context.str.value).to.equal("hello");
  });
  it("Push and pop array in array", () => {
    let ctx = new Context({});
    ctx.createArray("arr1");
    ctx.pushToArray("arr1", 20);
    ctx.createArray("arr2");
    ctx.pushToArray(
      "arr2",
      VariableFactory.getValueFromVariable(ctx.getVariable("arr1"))
    );
    expect(ctx.Context.arr2.value.length).to.equal(1);
    expect(ctx.Context.arr2.value[0][0]).to.equal(20);
  });
});
