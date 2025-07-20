import { hasLength } from './checks';
import { normalizeStringForCompare } from '../string/normalizeStringForCompare';

export const isString = (val: any): boolean => typeof val === 'string';
export const isStringFull = (val: any): boolean =>
  isString(val) && hasLength(val);
export const isDateString = (val: any): boolean =>
  isStringFull(val) &&
  /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(
    val,
  );
export const isEqualNormalizedString = (val: string, eq: string): boolean =>
  normalizeStringForCompare(val) === normalizeStringForCompare(eq);
export const stringSimilarityPercent = (val: string, eq: string): number =>
  isEqualNormalizedString(val, eq) ? 100 : 0;

export const isJsonString = (str: string): boolean => {
  let result = false;
  try {
    const obj = JSON.parse(str);
    if (obj && typeof obj === 'object') {
      result = true;
    }
  } catch (e) {
    result = false;
  }
  return result;
};
