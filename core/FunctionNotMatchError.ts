export class FunctionNotMatchError extends Error {
  constructor(funcName: string) {
    super(funcName + " is not match any pattern");
  }
}
