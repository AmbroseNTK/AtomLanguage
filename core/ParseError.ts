export class ParseError extends Error {
  constructor(error: Error, public fileName: string, public line: number) {
    super(error.message);
  }
}
