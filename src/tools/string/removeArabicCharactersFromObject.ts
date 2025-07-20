/** @format */

export function RemoveArabicCharactersFromObject(input: object) {
  for (const prop in input) {
    if (typeof input[prop] === 'string') {
      input[prop] = input[prop].trim();
      input[prop] = input[prop].replace(/[ی,ي]/g, 'ی');
      input[prop] = input[prop].replace(/[ک,ك]/g, 'ک');
    }
  }

  return input;
}
