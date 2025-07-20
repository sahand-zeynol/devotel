/**
 * Custom Error Handler
 *
 * @format
 */

export class CustomError extends Error {
  constructor({ message, ...args }) {
    // Calling parent constructor of base Error class.
    super();

    this.message = message;
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // You can use any additional properties you want.
    // tslint:disable-next-line:forin
    for (const arg in args) {
      this[arg] = args[arg];
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.date = new Date();
  }
}
