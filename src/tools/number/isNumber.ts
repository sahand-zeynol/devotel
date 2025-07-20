/** @format */

export function isNumber(input: string): boolean {
  let result = false;
  if (input !== null && input !== undefined && input.length > 0) {
    result = !isNaN(Number(input));
  }
  return result;
}
