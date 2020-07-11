import { expect } from "chai";
import "mocha";
import { Condition } from "../core/Condition";
import { Context } from "../core/Context";
import { Num } from "../core/primities/Num";

describe("Condition test", () => {
  it("Parsing and evaluating test", () => {
    let ctx = new Context({});
    expect(Condition.parse("2>3").execute(ctx)).to.equal(false);
    expect(Condition.parse("true  == true").execute(ctx)).to.equal(true);
    expect(Condition.parse('"Hello" == "Hello" ').execute(ctx)).to.equal(true);
    expect(Condition.parse("null  == null").execute(ctx)).to.equal(true);
    expect(Condition.parse("5 = 5").execute(ctx)).to.equal(true);
    try {
      Condition.parse('"Hello" < 1').execute(ctx);
    } catch (e) {
      expect(e.message).to.equal("Cannot evaluate Hello < 1");
    }
    ctx.createVariable("abc", new Num("", 10));
    ctx.createVariable("bcd", new Num("", 3.14));

    expect(Condition.parse("$abc  > $bcd").execute(ctx)).to.equal(true);
  });
});
