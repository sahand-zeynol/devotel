/** @format */

export function RemoveArabicCharacters(input: string) {
  if (typeof input === 'string') {
    input = input.trim();
    input = input.replace(/[ی,ي]/g, 'ی');
    input = input.replace(/[ک,ك]/g, 'ک');
  }

  return input;
}
