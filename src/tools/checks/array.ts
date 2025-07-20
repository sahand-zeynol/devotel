/** @format */

import { hasLength, isEqual, isValue } from './checks';
import { isStringFull } from './string';

export const isArrayFull = (val: any): boolean =>
  Array.isArray(val) && hasLength(val);
export const isArrayStrings = (val: any): boolean =>
  isArrayFull(val) && (val as string[]).every((v) => isStringFull(v));
export const containsAll = (arr1: any[], arr2: any[]): boolean =>
  arr1.every((element) => arr2.includes(element));
export const isIn = (val: any, arr: any[] = []): boolean =>
  isArrayFull(arr) && arr.some((o) => isEqual(val, o));
export const hasValue = (val: any): boolean =>
  isArrayFull(val) ? (val as any[]).every((o) => isValue(o)) : isValue(val);

// declare global {
//     interface Array<T> {
//         containsAll(arr: T): boolean;
//     }
// }
//
// // @ts-ignore
// Array.prototype.containsAll = (this, arr): boolean => this.every(element => arr.includes(element));
