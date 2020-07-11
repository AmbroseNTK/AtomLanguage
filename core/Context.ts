import { Variable } from "./Variable";
import { Null } from "./primities/Null";
import { Boolean } from "./primities/Boolean";
import { Str } from "./primities/Str";
import { Num } from "./primities/Num";
import { VariableFactory } from "./VariableFactory";
import { Any } from "./primities/Any";
import { FunctionLine } from "./FunctionLine";

export class Context {
  public callStack: Array<FunctionLine> = [];
  public jumpFlag: String = "";

  constructor(private ctx: any) {}

  public get Context() {
    return this.ctx;
  }
  public createVariable(variableName: string, value: Variable) {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      if (Object.keys(current).includes(token)) {
        if (current[token]["children"] == undefined) {
          current[token]["children"] = {};
        }
        current = current[token]["children"];
        continue;
      }
      current[token] = {
        value:
          current[token] == undefined ? undefined : current[token]["value"],
        children: current["children"] == undefined ? {} : current["children"],
      };
      current = current[token]["children"];
    }
    current[tokens[tokens.length - 1]] = {
      value: "",
    };
    current = current[tokens[tokens.length - 1]];

    if (value.nameOnly == false) {
      if (value instanceof Null) {
        current["value"] = null;
        current["type"] = "Null";
      } else if (value instanceof Boolean) {
        current["value"] = value.data;
        current["type"] = "Boolean";
      } else if (value instanceof Str) {
        current["value"] = value.data;
        current["type"] = "Str";
      } else if (value instanceof Num) {
        current["value"] = value.data;
        current["type"] = "Num";
      } else if (value instanceof Any) {
        current["value"] = value.data;
        current["type"] = "Any";
      }
    }
  }

  public getVariableValue(variableName: string): any {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      // if (Object.keys(current).includes(token)) {
      //   current = current[token]["children"];
      //   continue;
      // }
      if (current[token] == undefined) {
        throw new Error("Variable $" + variableName + " does not exist");
      }
      current = current[token]["children"];
    }
    current = current[tokens[tokens.length - 1]];
    if (
      current == undefined ||
      current["value"] == undefined ||
      current["type"] == undefined
    ) {
      throw new Error("Variable $" + variableName + " does not exist");
    }
    return current["value"];
  }
  public getVariable(variableName: string): Variable {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      if (current[token] == undefined) {
        throw new Error("Variable $" + variableName + " does not exist");
      }
      current = current[token]["children"];
    }
    current = current[tokens[tokens.length - 1]];
    if (
      current == undefined ||
      current["value"] == undefined ||
      current["type"] == undefined
    ) {
      throw new Error("Variable $" + variableName + " does not exist");
    }
    let varName = tokens[tokens.length - 1];
    switch (current["type"]) {
      case "Null":
        return new Null();
      case "Boolean":
        return new Boolean(varName, current["value"]);
      case "Str":
        return new Str(varName, current["value"]);
      case "Num":
        return new Num(varName, current["value"]);
      case "Array":
        return new Any(varName, current["value"]);
    }
    throw new Error("Cannot get $" + variableName);
  }
  public createArray(variableName: string) {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      current[token] = {
        value:
          current[token] == undefined ? undefined : current[token]["value"],
        children: {},
      };
      current = current[token]["children"];
    }
    current[tokens[tokens.length - 1]] = {
      value: [],
      type: "Array",
    };
    current = current[tokens[tokens.length - 1]];
    current["value"] = [];
    current["type"] = "Array";
  }
  public pushToArray(variableName: String, value: any) {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      current[token] = {
        value:
          current[token] == undefined ? undefined : current[token]["value"],
        children: {},
      };
      current = current[token]["children"];
    }

    current = current[tokens[tokens.length - 1]];
    if (current == undefined) {
      throw new Error("$" + variableName + " should be an array");
    }
    try {
      current["value"].push(value);
    } catch {
      throw new Error("$" + variableName + " should be an array");
    }
  }
  public popFromArray(variableName: string, toVariableName: string) {
    let tokens = variableName.trim().split(".");
    let current = this.ctx;
    for (let i = 0; i < tokens.length - 1; i++) {
      let token = tokens[i];
      current[token] = {
        value:
          current[token] == undefined ? undefined : current[token]["value"],
        children: {},
      };
      current = current[token]["children"];
    }
    current = current[tokens[tokens.length - 1]];
    try {
      let element = current["value"].pop();
      this.createVariable(
        toVariableName,
        VariableFactory.getVariableFromValue(element)
      );
    } catch {
      throw new Error("$" + variableName + " should be an array");
    }
  }
}
